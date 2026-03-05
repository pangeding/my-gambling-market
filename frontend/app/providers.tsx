"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia, localhost } from "wagmi/chains";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "Predict-It",
  projectId: "predict-it-demo",
  chains: [mainnet, sepolia, localhost],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}