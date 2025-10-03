// src/lib/appkit-init.js
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 🔹 WalletConnect Project ID
const projectId = "7e62c15febbe250cd8c4a5b3eec994ee";

// 🔹 Base Mainnet chain info
const baseMainnet = {
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet.base.org"] },
    public: { http: ["https://mainnet.base.org"] }
  }
};

const metadata = {
  name: "Contributions DApp",
  description: "WalletConnect + Base contract demo",
  url: "https://your-dapp-url.vercel.app", // ganti ke URL deploy kamu
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};

// 🔹 Buat adapter Wagmi
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [baseMainnet],
  metadata
});

// 🔹 Ambil wagmiConfig untuk WagmiProvider
export const wagmiConfig = wagmiAdapter.wagmiConfig;

// 🔹 Buat AppKit modal (pastikan networks di-pass)
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  metadata,
  networks: [baseMainnet] // ✅ wajib ada
});
