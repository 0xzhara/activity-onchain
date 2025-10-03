// src/components/CheckInButton.jsx
import React from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/abi";

export default function CheckInButton() {
  const { address, isConnected } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({ hash });

  const handleCheckIn = async () => {
    if (!isConnected) {
      alert("⚠️ Please connect your wallet first!");
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "dailyCheckIn", // ✅ perbaikan: sesuai ABI
        account: address,
      });
    } catch (err) {
      console.error("❌ Check-in failed:", err);
      alert("Check-in failed, lihat console untuk detail error.");
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckIn}
        disabled={isLoading || !isConnected}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: isLoading ? "#ccc" : "#4CAF50",
          color: "white",
          fontWeight: "bold",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Processing..." : "Check In"}
      </button>

      {isSuccess && <p>✅ Check-in success!</p>}
      {isError && <p>❌ Check-in failed. Please try again.</p>}
    </div>
  );
}
