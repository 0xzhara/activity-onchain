// src/lib/appkit-init.js
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet } from "viem/chains";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error("❌ WalletConnect Project ID missing");
}

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
  url: window.location.origin, // ✅ otomatis sesuai domain Vercel
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet, baseMainnet], // ✅ include mainnet dulu
  metadata
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  metadata,
  networks: [mainnet, baseMainnet]
});
