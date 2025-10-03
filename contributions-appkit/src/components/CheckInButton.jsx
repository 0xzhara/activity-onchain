// src/components/CheckInButton.jsx
import React, { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/abi";
import { ethers } from "ethers";
import { useUI } from "../context/UIContext";
import { useLog } from "../context/LogContext";   // ✅ pakai LogContext

export default function CheckInButton({ className = "btn-success" }) {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { showToast } = useUI();
  const { addContractLog } = useLog();  // ✅ ambil function log
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    if (!isConnected || !walletClient) {
      showToast("Please connect wallet", "error");
      addContractLog("❌ Check-in failed (wallet not connected)");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.dailyCheckIn();
      await tx.wait();

      showToast("✅ Check-in successful!", "success");
      addContractLog("✅ Daily check-in successful!");
    } catch (err) {
      console.error(err);
      showToast("❌ Check-in failed", "error");
      addContractLog("❌ Daily check-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className={className} onClick={handleCheckIn} disabled={loading}>
      {loading ? "Checking in..." : "Check In"}
    </button>
  );
}
