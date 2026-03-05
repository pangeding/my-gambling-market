# Project Name: Predict-It
## Goal: A "freakly fast" hackathon MVP for a decentralized prediction market where users can bet on yes/no outcomes of events

### 1. Smart Contract (Foundry)
- **Standard:** ERC-1155 for prediction shares (YES/NO tokens)
- **Core Logic:** Users can buy YES/NO tokens for a specific event ID. Funds are pooled in the contract. Token prices adjust based on market demand.
- **Oracle:** Use a simple `owner-only` resolve function for the demo (Mocking the real oracle).
- **Invariants:** 1 Token = 1 Wei (simple pricing for demo).

### 2. Frontend Tech Stack
- **management** pnpm
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Web3:** Wagmi hooks + RainbowKit (Connect Wallet)
- **Deployment:** Vercel (Production URL: predict-it-demo.vercel.app)

### 3. User Flow (Critical for Claude)
1. User connects wallet via RainbowKit.
2. User sees a list of "Active Markets" (read from contract mapping) with event descriptions, current YES/NO prices, and total liquidity.
3. User clicks "Predict YES" or "Predict NO" on a market -> Modal opens to select amount.
4. User submits transaction -> Contract mints prediction tokens and transfers ETH.
5. UI shows a "Success" toast with the transaction hash and updates market stats.
6. (Admin) Owner can resolve markets, distributing pool to winning token holders.

### 4. Developer Instructions
- Use `CLAUDE.md` to track persistent progress.
- Prioritize "Happy Path" (User can successfully complete a swap).
- No complex backend; use on-chain events for data history.