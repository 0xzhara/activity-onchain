// src/components/ProposalList.jsx
import React, { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/abi";
import { ethers } from "ethers";
import { useUI } from "../context/UIContext";

export default function ProposalList() {
  const [proposals, setProposals] = useState([]);
  const { data: walletClient } = useWalletClient();
  const { showToast } = useUI();

  useEffect(() => {
    const loadProposals = async () => {
      if (!walletClient) return;
      try {
        const provider = new ethers.BrowserProvider(walletClient);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        let loaded = [];
        for (let i = 0; i < 20; i++) {
          try {
            const [description, votes] = await contract.getProposal(i);
            loaded.push({ id: i, description, votes: Number(votes) });
          } catch {
            break; // berhenti kalau proposal tidak ada
          }
        }
        setProposals(loaded);
      } catch (err) {
        console.error("Load proposals error:", err);
      }
    };
    loadProposals();
  }, [walletClient]);

  const handleVote = async (id) => {
    if (!walletClient) return showToast("⚠️ Please connect wallet first", "error");
    try {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.vote(BigInt(id));
      await tx.wait();

      showToast(`✅ Voted for proposal #${id}`, "success");

      // refresh list
      const [description, votes] = await contract.getProposal(id);
      setProposals((prev) =>
        prev.map((p) => (p.id === id ? { ...p, votes: Number(votes) } : p))
      );
    } catch (err) {
      console.error("Vote error:", err);
      showToast("❌ Vote failed: " + (err.message || "Unknown error"), "error");
    }
  };

  return (
    <div>
      {proposals.length === 0 && <p>No proposals found.</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {proposals.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#2d2d2d",
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            <h4 style={{ margin: "0 0 8px" }}>#{p.id}</h4>
            <p style={{ margin: "0 0 12px", color: "#ccc" }}>{p.description}</p>
            <p>🗳️ Votes: <strong>{p.votes}</strong></p>
            <button
              onClick={() => handleVote(p.id)}
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                background: "#2563eb",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
