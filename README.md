# Predict-It: Decentralized Prediction Market MVP

A "freakly fast" hackathon MVP for a decentralized prediction market where users can bet on yes/no outcomes of events using ERC-1155 tokens.

## Project Structure

- **`contracts/`** - Foundry smart contract project
  - `src/PredictionMarket.sol` - ERC-1155 based prediction market
  - `test/PredictionMarket.t.sol` - Comprehensive test suite
- **`frontend/`** - Next.js frontend application
  - Modern React with TypeScript
  - Tailwind CSS + shadcn/ui components
  - Wagmi + RainbowKit for wallet connection
  - Mock data for demonstration
- **`CLAUDE.md`** - Progress tracking and project status
- **`BEGIN.md`** - Project requirements and specifications

## Quick Start

### Smart Contract Development

```bash
cd contracts
forge install
forge test
```

### Frontend Development

```bash
cd frontend
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **ERC-1155 Prediction Shares**: Each market has YES/NO tokens
- **Dynamic Pricing**: Token prices adjust based on market demand (constant product formula)
- **Simple User Flow**: Connect wallet → View markets → Predict YES/NO → Claim winnings
- **Owner Resolution**: Market creator can resolve outcomes (simplified oracle)
- **Mock Data UI**: Fully functional frontend with simulated markets

## Tech Stack

### Smart Contracts
- **Solidity** with Foundry development environment
- **OpenZeppelin ERC-1155** for token standard
- **Forge** for testing and deployment

### Frontend
- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **Wagmi v2 + RainbowKit** for Ethereum wallet connection
- **React Query** for data fetching
- **Viem** for Ethereum interaction

## User Flow

1. **Connect Wallet**: Users connect via RainbowKit modal
2. **Browse Markets**: View active prediction markets with current prices and liquidity
3. **Make Prediction**: Click "Predict YES" or "Predict NO", enter token amount
4. **Transaction**: Mock transaction with toast notification (real contract integration ready)
5. **Resolution**: Market owner resolves outcome, winning token holders can claim proceeds

## Development Status

✅ **Phase 1: Project Setup** - Complete
✅ **Phase 2: Smart Contract** - Complete with full test coverage
✅ **Phase 3: Frontend** - Complete with mock data
✅ **Phase 4: Integration & Testing** - Mock data flow tested

The project is ready for real contract integration. The smart contract is fully tested and can be deployed to any EVM chain.

## Deployment

### Smart Contract
```bash
forge script script/PredictionMarket.s.sol --broadcast --verify
```

### Frontend
Deploy to Vercel:
```bash
vercel --prod
```

## License

MIT