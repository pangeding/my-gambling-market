"use client";

import { useState } from "react";
import MarketCard from "./MarketCard";
import type { Market } from "@/data/mock";

interface MarketListProps {
  markets: Market[];
}

export default function MarketList({ markets }: MarketListProps) {
  const [activeTab, setActiveTab] = useState<"all" | "yes" | "no">("all");

  const filteredMarkets = markets.filter((market) => {
    if (activeTab === "yes") return market.yesPrice < market.noPrice;
    if (activeTab === "no") return market.noPrice < market.yesPrice;
    return true;
  });

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Markets
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "yes"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("yes")}
        >
          YES Favored
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "no"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("no")}
        >
          NO Favored
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarkets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>

      {filteredMarkets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No markets match your filter.</p>
        </div>
      )}
    </div>
  );
}