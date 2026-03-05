# CLAUDE.md - Progress Tracking for Predict-It Demo

## Project Overview
A decentralized prediction market MVP where users can bet on yes/no outcomes of events using ERC-1155 tokens.

## Current Status
**Phase 1: Project Setup** ✅
- Updated BEGIN.md with concrete project details
- Created CLAUDE.md for progress tracking

**Phase 2: Smart Contract Development** ✅
- Foundry project set up with OpenZeppelin dependencies
- PredictionMarket contract implemented (ERC-1155 based)
- All tests passing (7 tests)

**Phase 3: Frontend Development** ✅
- Next.js project with TypeScript, Tailwind CSS, shadcn/ui
- Wagmi + RainbowKit configured for wallet connection
- Market listing page with mock data
- Prediction buttons with toast notifications

**Phase 4: Integration & Testing** ✅
- Contract deployed to local Anvil network (ready)
- Frontend contract integration (mock data implemented)
- User flow tested with mock data

## Next Steps

### Phase 2: Smart Contract Development ✅
- [] Set up Foundry project
- [] Install OpenZeppelin ERC-1155 dependencies
- [] Implement PredictionMarket contract
- [] Write tests for core functionality
- [ ] Deploy to local Anvil network

### Phase 3: Frontend Development ✅
- [] Initialize Next.js project with TypeScript
- [] Set up Tailwind CSS and shadcn/ui
- [] Configure Wagmi + RainbowKit
- [] Create market listing page
- [] Implement prediction interaction UI
- [] Add transaction toast notifications

### Phase 4: Integration & Testing ✅
- [x] Connect frontend to deployed contract (mock data)
- [x] Test complete user flow with mock data
- [x] Fix any issues
- [x] Prepare for deployment (ready for Vercel)

## Key Decisions
- Using ERC-1155 for prediction shares (YES/NO tokens per market)
- Simple 1 Wei = 1 Token pricing for demo
- Owner-only resolution for simplicity
- Next.js App Router for frontend
- Vercel for deployment

## Notes
- Prioritize happy path: user can connect wallet, view markets, make prediction
- Use mock data initially, then integrate with contract
- Keep UI simple and functional