// src/pages/Proposals.jsx
import React from "react";
import ProposalList from "../components/ProposalList";

export default function Proposals() {
  return (
    <div className="card">
      <h2>📋 Proposals (Base Mainnet)</h2>
      <ProposalList />
    </div>
  );
}
