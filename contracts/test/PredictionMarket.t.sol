// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {PredictionMarket} from "../src/PredictionMarket.sol";

contract PredictionMarketTest is Test {
    PredictionMarket public market;
    address public owner = address(0x1);
    address public user1 = address(0x2);
    address public user2 = address(0x3);

    function setUp() public {
        vm.startPrank(owner);
        market = new PredictionMarket();
        vm.stopPrank();
    }

    function testCreateMarket() public {
        vm.startPrank(owner);
        uint256 marketId = market.createMarket("Will ETH hit $5000 by end of 2024?");
        assertEq(marketId, 1);
        (string memory desc, uint256 totalYes, uint256 totalNo, uint256 totalLiquidity, bool resolved, bool outcome, uint256 yesPrice, uint256 noPrice) = market.getMarketInfo(marketId);
        assertEq(desc, "Will ETH hit $5000 by end of 2024?");
        assertEq(totalYes, 0);
        assertEq(totalNo, 0);
        assertEq(totalLiquidity, 0);
        assertEq(resolved, false);
        assertEq(outcome, false);
        assertEq(yesPrice, 1);
        assertEq(noPrice, 1);
        vm.stopPrank();
    }

    function testPredictYes() public {
        vm.startPrank(owner);
        uint256 marketId = market.createMarket("Test market");
        vm.stopPrank();

        vm.deal(user1, 1 ether);
        vm.startPrank(user1);
        market.predict{value: 0.5 ether}(marketId, true, 100);
        vm.stopPrank();

        (, uint256 totalYes, uint256 totalNo, uint256 totalLiquidity,,,,) = market.getMarketInfo(marketId);
        assertEq(totalYes, 100);
        assertEq(totalNo, 0);
        assertEq(totalLiquidity, 100); // price = 1 wei per token, cost = 100 wei
    }

    function testPredictNo() public {
        vm.startPrank(owner);
        uint256 marketId = market.createMarket("Test market");
        vm.stopPrank();

        vm.deal(user1, 1 ether);
        vm.startPrank(user1);
        market.predict{value: 0.5 ether}(marketId, false, 100);
        vm.stopPrank();

        (, uint256 totalYes, uint256 totalNo, uint256 totalLiquidity,,,,) = market.getMarketInfo(marketId);
        assertEq(totalYes, 0);
        assertEq(totalNo, 100);
        assertEq(totalLiquidity, 100); // price = 1 wei per token, cost = 100 wei
    }

    function testPriceCalculation() public {
        vm.startPrank(owner);
        uint256 marketId = market.createMarket("Test market");
        vm.stopPrank();

        // Initial prices should be 1 wei each
        (,,,,,, uint256 yesPrice, uint256 noPrice) = market.getMarketInfo(marketId);
        assertEq(yesPrice, 1);
        assertEq(noPrice, 1);

        // User1 buys YES tokens (100 tokens at 1 wei each)
        vm.deal(user1, 2 ether);
        vm.startPrank(user1);
        market.predict{value: 1 ether}(marketId, true, 100);
        vm.stopPrank();

        // After YES purchase, YES price should stay 1 (since totalNo = 0), NO price also 1
        (,,,,,, yesPrice, noPrice) = market.getMarketInfo(marketId);
        assertEq(yesPrice, 1);
        assertEq(noPrice, 1);

        // User2 buys NO tokens (100 tokens at 1 wei each)
        vm.deal(user2, 2 ether);
        vm.startPrank(user2);
        market.predict{value: 1 ether}(marketId, false, 100);
        vm.stopPrank();

        // Now totalYes = 100, totalNo = 100, prices should be 1 each
        (,,,,,, yesPrice, noPrice) = market.getMarketInfo(marketId);
        assertEq(yesPrice, 1);
        assertEq(noPrice, 1);
    }

    function testResolveAndClaim() public {
        vm.startPrank(owner);
        uint256 marketId = market.createMarket("Test market");
        vm.stopPrank();

        // User1 buys YES
        vm.deal(user1, 1 ether);
        vm.startPrank(user1);
        market.predict{value: 0.5 ether}(marketId, true, 100);
        vm.stopPrank();

        // User2 buys NO
        vm.deal(user2, 1 ether);
        vm.startPrank(user2);
        market.predict{value: 0.5 ether}(marketId, false, 100);
        vm.stopPrank();

        // Resolve as YES
        vm.startPrank(owner);
        market.resolveMarket(marketId, true);
        vm.stopPrank();

        // User1 claims winnings
        uint256 user1BalanceBefore = user1.balance;
        vm.startPrank(user1);
        market.claimWinnings(marketId);
        vm.stopPrank();

        // User1 should get the whole pool (200 wei) minus cost (100 wei) = net +100 wei
        uint256 user1BalanceAfter = user1.balance;
        assertGt(user1BalanceAfter, user1BalanceBefore); // Should have more ETH after claiming
    }

    function testCannotPredictOnResolvedMarket() public {
        vm.startPrank(owner);
        uint256 marketId = market.createMarket("Test market");
        market.resolveMarket(marketId, true);
        vm.stopPrank();

        vm.deal(user1, 1 ether);
        vm.startPrank(user1);
        vm.expectRevert("Market already resolved");
        market.predict{value: 0.5 ether}(marketId, true, 100);
        vm.stopPrank();
    }

    function testOnlyOwnerCanCreateMarket() public {
        vm.startPrank(user1);
        vm.expectRevert();
        market.createMarket("Should fail");
        vm.stopPrank();
    }

    function testOnlyOwnerCanResolve() public {
        vm.startPrank(owner);
        uint256 marketId = market.createMarket("Test market");
        vm.stopPrank();

        vm.startPrank(user1);
        vm.expectRevert();
        market.resolveMarket(marketId, true);
        vm.stopPrank();
    }
}