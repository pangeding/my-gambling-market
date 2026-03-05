// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PredictionMarket is ERC1155, Ownable {
    struct Market {
        string description;
        uint256 totalYes;
        uint256 totalNo;
        uint256 totalLiquidity;
        bool resolved;
        bool outcome; // true = YES wins, false = NO wins
    }

    // Mapping from market ID to Market struct
    mapping(uint256 => Market) public markets;

    // Next market ID
    uint256 public nextMarketId;

    // Constants for token IDs within a market
    uint256 private constant TOKEN_YES = 0;
    uint256 private constant TOKEN_NO = 1;

    // Events
    event MarketCreated(uint256 indexed marketId, string description);
    event PredictionMade(
        uint256 indexed marketId,
        address indexed user,
        bool isYes,
        uint256 amount,
        uint256 cost
    );
    event MarketResolved(uint256 indexed marketId, bool outcome);
    event FundsClaimed(uint256 indexed marketId, address indexed user, uint256 amount);

    constructor() ERC1155("") Ownable(msg.sender) {
        nextMarketId = 1;
    }

    // Create a new market (owner only for simplicity)
    function createMarket(string calldata description) external onlyOwner returns (uint256) {
        uint256 marketId = nextMarketId;
        markets[marketId] = Market({
            description: description,
            totalYes: 0,
            totalNo: 0,
            totalLiquidity: 0,
            resolved: false,
            outcome: false
        });
        nextMarketId++;

        emit MarketCreated(marketId, description);
        return marketId;
    }

    // Calculate token price in wei per token (1 Wei = 1 Token base price)
    function getPrice(uint256 marketId, bool isYes) public view returns (uint256) {
        Market storage market = markets[marketId];

        if (isYes) {
            // Price = totalNo / totalYes (simplified constant product)
            if (market.totalYes == 0) return 1; // Starting price: 1 wei per token
            uint256 price = market.totalNo / market.totalYes;
            return price < 1 ? 1 : price; // minimum 1 wei
        } else {
            if (market.totalNo == 0) return 1;
            uint256 price = market.totalYes / market.totalNo;
            return price < 1 ? 1 : price;
        }
    }

    // Buy prediction tokens
    function predict(uint256 marketId, bool isYes, uint256 amount) external payable {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market already resolved");
        require(amount > 0, "Amount must be positive");

        uint256 price = getPrice(marketId, isYes);
        uint256 cost = amount * price;
        require(msg.value >= cost, "Insufficient payment");

        // Update market totals
        if (isYes) {
            market.totalYes += amount;
        } else {
            market.totalNo += amount;
        }
        market.totalLiquidity += cost;

        // Mint tokens to user
        uint256 tokenId = isYes ? TOKEN_YES : TOKEN_NO;
        _mint(msg.sender, marketId * 2 + tokenId, amount, "");

        // Refund excess payment
        if (msg.value > cost) {
            (bool success, ) = payable(msg.sender).call{value: msg.value - cost}("");
            require(success, "Refund failed");
        }

        emit PredictionMade(marketId, msg.sender, isYes, amount, cost);
    }

    // Resolve market (owner only)
    function resolveMarket(uint256 marketId, bool outcome) external onlyOwner {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market already resolved");

        market.resolved = true;
        market.outcome = outcome;

        emit MarketResolved(marketId, outcome);
    }

    // Claim winnings after resolution
    function claimWinnings(uint256 marketId) external {
        Market storage market = markets[marketId];
        require(market.resolved, "Market not resolved yet");

        uint256 winningTokenId = market.outcome ? TOKEN_YES : TOKEN_NO;
        uint256 userBalance = balanceOf(msg.sender, marketId * 2 + winningTokenId);
        require(userBalance > 0, "No winning tokens");

        // Calculate share of pool
        uint256 totalWinningTokens = market.outcome ? market.totalYes : market.totalNo;
        uint256 share = (userBalance * market.totalLiquidity) / totalWinningTokens;

        // Burn tokens
        _burn(msg.sender, marketId * 2 + winningTokenId, userBalance);

        // Transfer winnings
        (bool success, ) = payable(msg.sender).call{value: share}("");
        require(success, "Transfer failed");

        emit FundsClaimed(marketId, msg.sender, share);
    }

    // Get market info
    function getMarketInfo(uint256 marketId) external view returns (
        string memory description,
        uint256 totalYes,
        uint256 totalNo,
        uint256 totalLiquidity,
        bool resolved,
        bool outcome,
        uint256 yesPrice,
        uint256 noPrice
    ) {
        Market storage market = markets[marketId];
        description = market.description;
        totalYes = market.totalYes;
        totalNo = market.totalNo;
        totalLiquidity = market.totalLiquidity;
        resolved = market.resolved;
        outcome = market.outcome;
        yesPrice = getPrice(marketId, true);
        noPrice = getPrice(marketId, false);
    }

    // Withdraw fees (owner only) - optional
    function withdrawFees() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    // Receive ETH
    receive() external payable {}
}