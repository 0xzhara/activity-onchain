import React, { useEffect } from "react";
import ConnectButton from "./components/ConnectButton";
import AccountInfo from "./components/AccountInfo";
import CheckInButton from "./components/CheckInButton";
import VoteForm from "./components/VoteForm";
import CreateProposalForm from "./components/CreateProposalForm";
import SendMessageForm from "./components/SendMessageForm";
import WalletActivityLog from "./components/WalletActivityLog";
import Navbar from "./components/Navbar";
import { UIProvider } from "./context/UIContext";

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
    }, { threshold: 0.1 });
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <UIProvider>
      <div style={{ fontFamily: "Inter, Arial, sans-serif", maxWidth: 900, margin: "0 auto" }}>
        <Navbar />

        <section id="home">
          <h1>Contributions — AppKit (WalletConnect)</h1>
          <p>ProjectId: <code>{import.meta.env.VITE_WALLETCONNECT_PROJECT_ID}</code></p>
        </section>

        <section id="activity" style={{ marginTop: 40 }}>
          <h2>Activity</h2>
          <ConnectButton />
          <AccountInfo />
          <WalletActivityLog />
        </section>

        <section id="proposals" style={{ marginTop: 40 }}>
          <h2>Proposals</h2>
          <CheckInButton />
          <VoteForm />
          <CreateProposalForm />
        </section>

        <section id="messages" style={{ marginTop: 40 }}>
          <h2>Messages</h2>
          <SendMessageForm />
        </section>
      </div>
    </UIProvider>
  );
}
