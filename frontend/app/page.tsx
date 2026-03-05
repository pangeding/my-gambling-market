"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import MarketList from "@/components/MarketList";
import { mockMarkets } from "@/data/mock";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-gray-900">Predict-It</h1>
          </div>
          <ConnectButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Decentralized Prediction Markets
          </h2>
          <p className="text-gray-600">
            Bet on yes/no outcomes of events using ERC-1155 tokens. Simple,
            fast, and decentralized.
          </p>
        </div>

        {isConnected ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Active Markets</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Create New Market (Admin)
              </button>
            </div>
            <MarketList markets={mockMarkets} />
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Connect your wallet to start predicting
              </h3>
              <p className="text-gray-600 mb-6">
                Connect your Ethereum wallet to view active markets and make
                predictions.
              </p>
              <div className="inline-block">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t bg-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>Predict-It Demo • ERC-1155 Prediction Markets • Built with Next.js + Wagmi</p>
        </div>
      </footer>
    </div>
  );
}