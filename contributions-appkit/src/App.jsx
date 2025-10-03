import React, { useEffect } from "react";
import ConnectButton from "./components/ConnectButton";
import AccountInfo from "./components/AccountInfo";
import CheckInButton from "./components/CheckInButton";
import VoteForm from "./components/VoteForm";
import CreateProposalForm from "./components/CreateProposalForm";
import SendMessageForm from "./components/SendMessageForm";
import Navbar from "./components/Navbar";
import { UIProvider } from "./context/UIContext";
import { LogProvider } from "./context/LogContext";
import ActivityTabs from "./components/ActivityTabs";

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
      <LogProvider>
        <div style={{ fontFamily: "Inter, Arial, sans-serif", maxWidth: 900, margin: "0 auto" }}>
          <Navbar />

          <section id="activity" className="card">
            <h2>Activity</h2>
            <ConnectButton />
            <AccountInfo />
            <ActivityTabs /> {/* ✅ sekarang hanya Contract Log */}
          </section>

          <section id="proposals" className="card">
            <h2>Proposals</h2>
            <CheckInButton className="btn-success" />
            <VoteForm />
            <CreateProposalForm />
          </section>

          <section id="messages" className="card">
            <h2>Messages</h2>
            <SendMessageForm />
          </section>

          <footer>
            Made with ❤️ by <strong>0xzhara</strong>
          </footer>
        </div>
      </LogProvider>
    </UIProvider>
  );
}
