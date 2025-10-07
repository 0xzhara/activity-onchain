// src/lib/appkit-init.js
// WalletConnect + Reown AppKit full configuration for Base & Celo
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet } from "viem/chains";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error("❌ Missing WalletConnect Project ID. Please set VITE_WALLETCONNECT_PROJECT_ID in .env");
}

// ✅ Define Base network
const baseMainnet = {
  id: 8453,
  name: "Base Mainnet",
  network: "base",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "BaseScan",
      url: "https://basescan.org",
    },
  },
};

// ✅ Define Celo network (for future expansion / rewards eligibility)
const celoMainnet = {
  id: 42220,
  name: "Celo Mainnet",
  network: "celo",
  nativeCurrency: {
    name: "Celo",
    symbol: "CELO",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://forno.celo.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://explorer.celo.org",
    },
  },
};

// ✅ WalletConnect Metadata (important for Builder Rewards)
const metadata = {
  name: "Activity Onchain App",
  description: "A decentralized app for tracking contributions, proposals, and onchain activity — built with Reown AppKit & WalletConnect.",
  url: "https://activity-onchain.vercel.app/", // 🟢 replace with your deployed URL
  icons: ["https://activity-onchain.vercel.app/logo-192.png"], // 🟢 replace with your project logo URL
  contactEmail: "wildanapdol@gmail.com", // 🟢 must match your WalletConnect registration email
};

// ✅ Initialize Wagmi Adapter (used by AppKit)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet, baseMainnet, celoMainnet],
  metadata,
});

// ✅ Export wagmiConfig for hooks/components
export const wagmiConfig = wagmiAdapter.wagmiConfig;

// ✅ Create Reown AppKit instance
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  metadata,
  networks: [mainnet, baseMainnet, celoMainnet],
});

console.info("✅ WalletConnect AppKit initialized successfully with Base & Celo networks");