import React, { useState } from "react";
import { useWalletClient } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/abi";
import { ethers } from "ethers";
import { useUI } from "../context/UIContext";

export default function VoteForm() {
  const [proposalId, setProposalId] = useState("");
  const [voteYes, setVoteYes] = useState(true);
  const { data: walletClient } = useWalletClient();
  const { showToast } = useUI();

  const handleVote = async () => {
    if (!proposalId) return showToast("Enter proposal ID", "error");
    try {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.vote(proposalId, voteYes);
      await tx.wait();

      showToast("✅ Vote submitted", "success");
      setProposalId("");
    } catch (err) {
      console.error(err);
      showToast("❌ Vote failed", "error");
    }
  };

  return (
    <div className="form-row">
      <input
        type="number"
        placeholder="Proposal ID"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
      />
      <select value={voteYes} onChange={(e) => setVoteYes(e.target.value === "true")}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <button className="btn-primary" onClick={handleVote}>
        Vote
      </button>
    </div>
  );
}
