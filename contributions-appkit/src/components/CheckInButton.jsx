import React from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/abi";

export default function CheckInButton() {
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  return (
    <div>
      <button
        onClick={() =>
          writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: "checkIn",
          })
        }
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Check In"}
      </button>

      {isSuccess && <p>✅ Check-in success!</p>}
    </div>
  );
}
