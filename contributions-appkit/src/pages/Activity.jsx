// src/pages/Activity.jsx
import React from "react";
import AccountInfo from "../components/AccountInfo";
import CheckInButton from "../components/CheckInButton";
import VoteForm from "../components/VoteForm";
import CreateProposalForm from "../components/CreateProposalForm";
import SendMessageForm from "../components/SendMessageForm";

export default function Activity() {
  return (
    <div className="card">
      <h2>Activity Base</h2>
      <AccountInfo />

      {/* Check-in harian */}
      <div style={{ marginTop: "12px" }}>
        <CheckInButton className="btn-success" />
      </div>

      {/* Quest lainnya */}
      <div style={{ marginTop: "12px" }}>
        <VoteForm />
        <CreateProposalForm />
        <SendMessageForm />
      </div>
    </div>
  );
}
