export interface Market {
  id: number;
  description: string;
  totalYes: number;
  totalNo: number;
  totalLiquidity: number;
  yesPrice: number;
  noPrice: number;
  resolved: boolean;
  outcome: boolean; // true = YES won
}

export const mockMarkets: Market[] = [
  {
    id: 1,
    description: "Will Ethereum reach $5,000 by end of 2024?",
    totalYes: 12500,
    totalNo: 7500,
    totalLiquidity: 2.5,
    yesPrice: 0.0002,
    noPrice: 0.0003,
    resolved: false,
    outcome: false,
  },
  {
    id: 2,
    description: "Will Bitcoin ETF be approved by SEC in Q1 2024?",
    totalYes: 8500,
    totalNo: 11500,
    totalLiquidity: 1.8,
    yesPrice: 0.00035,
    noPrice: 0.00025,
    resolved: true,
    outcome: false,
  },
  {
    id: 3,
    description: "Will Solana outperform Ethereum in Q4 2024?",
    totalYes: 15000,
    totalNo: 5000,
    totalLiquidity: 3.2,
    yesPrice: 0.00018,
    noPrice: 0.0005,
    resolved: false,
    outcome: false,
  },
  {
    id: 4,
    description: "Will the Fed cut interest rates in March 2024?",
    totalYes: 9000,
    totalNo: 11000,
    totalLiquidity: 2.1,
    yesPrice: 0.0003,
    noPrice: 0.00022,
    resolved: false,
    outcome: false,
  },
  {
    id: 5,
    description: "Will OpenAI release GPT-5 before July 2024?",
    totalYes: 14000,
    totalNo: 6000,
    totalLiquidity: 2.8,
    yesPrice: 0.0002,
    noPrice: 0.00045,
    resolved: false,
    outcome: false,
  },
  {
    id: 6,
    description: "Will Trump win the 2024 US presidential election?",
    totalYes: 12000,
    totalNo: 8000,
    totalLiquidity: 2.4,
    yesPrice: 0.00025,
    noPrice: 0.0003,
    resolved: false,
    outcome: false,
  },
];

export function addMarket(description: string): Market {
  const newMarket: Market = {
    id: mockMarkets.length + 1,
    description,
    totalYes: 0,
    totalNo: 0,
    totalLiquidity: 0,
    yesPrice: 0.0001,
    noPrice: 0.0001,
    resolved: false,
    outcome: false,
  };
  mockMarkets.push(newMarket);
  return newMarket;
}