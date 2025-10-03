import React, { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/abi";

export default function SendMessageForm() {
  const [message, setMessage] = useState("");
  const { address } = useAccount();

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "sendMessage",
      args: [message],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send"}
      </button>

      {isSuccess && <p>✅ Message sent successfully!</p>}
    </form>
  );
}
