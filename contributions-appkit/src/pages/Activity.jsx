// src/pages/Activity.jsx
import React from "react";
import AccountInfo from "../components/AccountInfo";
import CheckInButton from "../components/CheckInButton";
import CreateProposalForm from "../components/CreateProposalForm";
import SendMessageForm from "../components/SendMessageForm";
import VoteForm from "../components/VoteForm";
// ❌ ProposalList dihapus dari sini

export default function Activity() {
  return (
    <div className="card">
      <h2>Activity</h2>
      <AccountInfo />

      {/* Check-in harian */}
      <div style={{ marginTop: "12px" }}>
        <CheckInButton className="btn-success" />
      </div>

      {/* Manual vote */}
      <VoteForm />

      {/* Buat proposal baru */}
      <CreateProposalForm />

      {/* Kirim pesan */}
      <SendMessageForm />
    </div>
  );
}
