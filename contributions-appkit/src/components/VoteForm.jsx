import React, { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/abi";

export default function VoteForm() {
  const [proposalId, setProposalId] = useState("");
  const [vote, setVote] = useState(true);

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleVote = (e) => {
    e.preventDefault();
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "vote",
      args: [proposalId, vote],
    });
  };

  return (
    <form onSubmit={handleVote}>
      <input
        type="text"
        placeholder="Proposal ID"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
      />
      <select value={vote} onChange={(e) => setVote(e.target.value === "true")}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Voting..." : "Vote"}
      </button>
      {isSuccess && <p>✅ Vote submitted!</p>}
    </form>
  );
}
