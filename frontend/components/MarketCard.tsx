"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Market } from "@/data/mock";

interface MarketCardProps {
  market: Market;
}

export default function MarketCard({ market }: MarketCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictionAmount, setPredictionAmount] = useState("");
  const [selectedSide, setSelectedSide] = useState<"yes" | "no" | null>(null);

  const handlePredict = (side: "yes" | "no") => {
    setSelectedSide(side);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!predictionAmount || isNaN(Number(predictionAmount)) || Number(predictionAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    // Mock transaction
    toast.success(`Prediction submitted! ${predictionAmount} tokens on ${selectedSide?.toUpperCase()}`);
    setIsModalOpen(false);
    setPredictionAmount("");
  };

  const yesPercentage = (market.totalYes / (market.totalYes + market.totalNo)) * 100;
  const noPercentage = 100 - yesPercentage;

  return (
    <>
      <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Market #{market.id}
            </span>
            <h4 className="text-lg font-bold text-gray-900 mt-2">
              {market.description}
            </h4>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Liquidity</div>
            <div className="text-xl font-bold text-gray-900">
              {market.totalLiquidity} ETH
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">YES {market.yesPrice} ETH</span>
            <span className="font-medium">NO {market.noPrice} ETH</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${yesPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{market.totalYes} tokens</span>
            <span>{market.totalNo} tokens</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="py-3 bg-green-50 text-green-700 rounded-lg font-bold hover:bg-green-100 transition"
            onClick={() => handlePredict("yes")}
          >
            Predict YES
          </button>
          <button
            className="py-3 bg-red-50 text-red-700 rounded-lg font-bold hover:bg-red-100 transition"
            onClick={() => handlePredict("no")}
          >
            Predict NO
          </button>
        </div>

        <div className="mt-4 pt-4 border-t text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Resolved:</span>
            <span className={market.resolved ? "text-green-600" : "text-yellow-600"}>
              {market.resolved ? (market.outcome ? "YES Won" : "NO Won") : "Pending"}
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              Predict{" "}
              <span className={selectedSide === "yes" ? "text-green-600" : "text-red-600"}>
                {selectedSide?.toUpperCase()}
              </span>{" "}
              on Market #{market.id}
            </h3>
            <p className="text-gray-600 mb-6">{market.description}</p>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Amount of tokens
              </label>
              <input
                type="number"
                min="1"
                step="1"
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter token amount"
                value={predictionAmount}
                onChange={(e) => setPredictionAmount(e.target.value)}
              />
              <div className="text-sm text-gray-500 mt-2">
                Cost:{" "}
                {predictionAmount &&
                  !isNaN(Number(predictionAmount)) &&
                  (
                    Number(predictionAmount) *
                    (selectedSide === "yes" ? market.yesPrice : market.noPrice)
                  ).toFixed(6)}{" "}
                ETH
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 py-3 border rounded-lg font-medium hover:bg-gray-50"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Confirm Prediction
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}