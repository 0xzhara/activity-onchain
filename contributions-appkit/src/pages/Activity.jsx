// src/pages/Activity.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AccountInfo from "../components/AccountInfo";
import CheckInButton from "../components/CheckInButton";
import CreateProposalForm from "../components/CreateProposalForm";
import SendMessageForm from "../components/SendMessageForm";
import VoteForm from "../components/VoteForm";

export default function Activity() {
  const [logs, setLogs] = useState([]);

  // Ambil log dari localStorage + auto-refresh setiap 2 detik
  useEffect(() => {
    const loadLogs = () => {
      const stored = JSON.parse(localStorage.getItem("walletLogs")) || [];
      setLogs(stored);
    };

    loadLogs();
    const interval = setInterval(loadLogs, 2000); // refresh otomatis tiap 2 detik
    return () => clearInterval(interval);
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

  // Warna event berdasarkan tipe
  const getColor = (type) => {
    switch (type) {
      case "CONNECTED":
        return "#28a745"; // hijau
      case "DISCONNECTED":
        return "#dc3545"; // merah
      case "CHAIN_SWITCH":
        return "#007bff"; // biru
      default:
        return "#6c757d"; // abu-abu
    }
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
      <h3>📜 Wallet Activity Log (Real-Time)</h3>
      <p style={{ color: "#777", marginBottom: "1rem" }}>
        Riwayat aktivitas wallet kamu muncul otomatis setiap ada event.
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

      {/* Animasi log */}
      {logs.length === 0 ? (
        <p style={{ color: "#999" }}>Belum ada aktivitas wallet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          <AnimatePresence>
            {logs.map((log, idx) => (
              <motion.li
                key={log.timestamp + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{
                  marginBottom: "10px",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#f9f9f9",
                  border: `2px solid ${getColor(log.type)}`,
                  boxShadow: `0 2px 8px ${getColor(log.type)}33`,
                }}
              >
                <strong style={{ color: getColor(log.type) }}>
                  {log.type}
                </strong>
                <br />
                <small>
                  {new Date(log.timestamp).toLocaleString()} — Chain:{" "}
                  {log.details?.chainId || "N/A"} — Address:{" "}
                  {log.details?.address
                    ? `${log.details.address.slice(0, 6)}...${log.details.address.slice(-4)}`
                    : "-"}
                </small>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
