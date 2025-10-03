import React, { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/abi";

export default function CreateProposalForm() {
  const [description, setDescription] = useState("");

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleSubmit = (e) => {
    e.preventDefault();
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "createProposal",
      args: [description],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Proposal description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Create Proposal"}
      </button>
      {isSuccess && <p>✅ Proposal created!</p>}
    </form>
  );
}
