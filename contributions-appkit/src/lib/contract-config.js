// Import kedua ABI untuk Base dan Celo
import BaseABI from "../abi/ActivityXP_Base.json";
import CeloABI from "../abi/ActivityXP_Celo.json";

// Pastikan environment variable sudah di-setup di .env
export const contracts = {
  base: {
    address: import.meta.env.VITE_XP_CONTRACT_BASE || "0x5a12bf8E51422FB3d1ffF70478495c70dce77f9e",
    abi: BaseABI,
    chainId: 8453,
  },
  celo: {
    address: import.meta.env.VITE_XP_CONTRACT_CELO || "0xe6C6D548747E4b14D15d11446DCe95bdf60913d8",
    abi: CeloABI,
    chainId: 42220,
  },
};
