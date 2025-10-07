import React, { useState, useEffect } from "react";
import AccountInfo from "../components/AccountInfo";
import CheckInButton from "../components/CheckInButton";
import CreateProposalForm from "../components/CreateProposalForm";
import SendMessageForm from "../components/SendMessageForm";
import VoteForm from "../components/VoteForm";

export default function Activity() {
  const [logs, setLogs] = useState([]);

  // Ambil log dari localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("walletLogs")) || [];
    setLogs(stored);
  }, []);

  // Hapus log
  const clearLogs = () => {
    localStorage.removeItem("walletLogs");
    setLogs([]);
  };

  // Export JSON
  const exportLogs = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "wallet-activity-log.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
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

      <hr style={{ margin: "2rem 0" }} />

      {/* 🧠 Wallet Activity Log Viewer */}
      <h3>📜 Wallet Activity Log</h3>
      <p style={{ color: "#777", marginBottom: "1rem" }}>
        Riwayat koneksi dan chain event kamu disimpan di localStorage.
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={clearLogs}
          style={{
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            marginRight: "8px",
            cursor: "pointer",
          }}
        >
          🧹 Clear Logs
        </button>

        <button
          onClick={exportLogs}
          style={{
            backgroundColor: "#0275d8",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          💾 Export JSON
        </button>
      </div>

      {logs.length === 0 ? (
        <p style={{ color: "#999" }}>Belum ada aktivitas wallet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {logs.map((log, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: "10px",
                padding: "12px",
                borderRadius: "8px",
                background: "#f9f9f9",
                border: "1px solid #eee",
                transition: "all 0.2s",
              }}
            >
              <strong>{log.type}</strong>
              <br />
              <small>
                {new Date(log.timestamp).toLocaleString()} — Chain:{" "}
                {log.details?.chainId || "N/A"} — Address:{" "}
                {log.details?.address
                  ? `${log.details.address.slice(0, 6)}...${log.details.address.slice(-4)}`
                  : "-"}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
