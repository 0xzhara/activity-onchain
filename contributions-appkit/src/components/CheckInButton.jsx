// src/components/CheckInButton.jsx
import React, { useState } from "react";
import { useAccount, useWalletClient, useChainId } from "wagmi";
import { ethers } from "ethers";
import { useUI } from "../context/UIContext";
import { useLog } from "../context/LogContext";
import { contracts } from "../lib/contract-config"; // ✅ pakai config multi-chain

export default function CheckInButton({ className = "btn-success" }) {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  const { showToast } = useUI();
  const { addContractLog } = useLog();
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    if (!isConnected || !walletClient) {
      showToast("⚠️ Please connect wallet", "error");
      addContractLog("❌ Check-in failed (wallet not connected)");
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();

      // ✅ Deteksi chain aktif (Base / Celo)
      const network = chainId === 42220 ? "celo" : "base";
      const contractInfo = contracts[network];
      const contract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer);

      // ✅ Panggil fungsi sesuai kontrak aktif
      const tx = await contract.checkIn();
      await tx.wait();

      showToast(`✅ Check-in successful on ${network.toUpperCase()}!`, "success");
      addContractLog(`✅ Daily check-in successful on ${network.toUpperCase()}`);
    } catch (err) {
      console.error("❌ TX error:", err);
      showToast("❌ Check-in failed", "error");
      addContractLog("❌ Daily check-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className={className} onClick={handleCheckIn} disabled={loading}>
      {loading ? "⏳ Checking in..." : "🔥 Check In (Onchain)"}
    </button>
  );
}
