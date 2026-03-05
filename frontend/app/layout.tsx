import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/Toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Predict-It | Decentralized Prediction Markets",
  description: "Bet on yes/no outcomes of events using ERC-1155 tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}