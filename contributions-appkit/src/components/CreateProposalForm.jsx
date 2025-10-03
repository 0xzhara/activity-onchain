import React, { useState } from "react";
import { useWalletClient } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/abi";
import { ethers } from "ethers";
import { useUI } from "../context/UIContext";

export default function CreateProposalForm() {
  const [description, setDescription] = useState("");
  const { data: walletClient } = useWalletClient();
  const { showToast } = useUI();

  const handleCreate = async () => {
    if (!description) return showToast("Enter proposal description", "error");
    try {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.createProposal(description);
      await tx.wait();

      showToast("✅ Proposal created", "success");
      setDescription("");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to create proposal", "error");
    }
  };

  return (
    <div className="form-row" style={{ marginTop: "8px" }}>
      <input
        type="text"
        placeholder="Proposal description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn-primary" onClick={handleCreate}>
        Create Proposal
      </button>
    </div>
  );
}
