// src/components/AllProposals.jsx
import React, { useState } from "react";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/abi";

export default function AllProposals() {
  const [maxId, setMaxId] = useState(5); // default ambil 5 dulu

  // Buat array id dari 0 sampai maxId-1
  const ids = Array.from({ length: maxId }, (_, i) => i);

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <h3>All Proposals</h3>
      <p>Showing proposals from ID 0 to {maxId - 1}</p>
      <button
        onClick={() => setMaxId((prev) => prev + 5)}
        style={{ marginBottom: 12, padding: "6px 12px" }}
      >
        Load More
      </button>

      {ids.map((id) => (
        <ProposalItem key={id} id={id} />
      ))}
    </div>
  );
}

function ProposalItem({ id }) {
  const { data, error, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "proposals",
    args: [BigInt(id)],
  });

  if (isLoading) return <p>Loading proposal {id}...</p>;
  if (error) return null; // kalau error (misal id kosong), skip saja
  if (!data) return null;

  return (
    <div style={{ borderTop: "1px solid #eee", padding: "8px 0" }}>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Description:</strong> {data[0]}</p>
      <p><strong>Votes:</strong> {data[1].toString()}</p>
    </div>
  );
}
