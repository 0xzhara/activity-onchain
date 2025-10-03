// src/App.jsx
import React from "react";
import ConnectButton from "./components/ConnectButton";
import AccountInfo from "./components/AccountInfo";
import CheckInButton from "./components/CheckInButton";
import VoteForm from "./components/VoteForm";
import CreateProposalForm from "./components/CreateProposalForm";
import SendMessageForm from "./components/SendMessageForm";

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "Inter, Arial, sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <h1>Contributions — AppKit (WalletConnect)</h1>
      <p>ProjectId: <code>{import.meta.env.VITE_WALLETCONNECT_PROJECT_ID}</code></p>

      <section style={{ marginTop: 12 }}>
        <ConnectButton />
        <AccountInfo />
      </section>

      <hr style={{ margin: "20px 0" }} />

      <section>
        <h2>Contract actions</h2>
        <div style={{ display: "grid", gap: 12 }}>
          <CheckInButton />
          <VoteForm />
          <CreateProposalForm />
          <SendMessageForm />
        </div>
      </section>
    </div>
  );
}
