// src/components/WalletActivityLog.jsx
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function WalletActivityLog() {
  const { address, isConnected } = useAccount();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (isConnected) {
      addLog(`✅ Wallet connected: ${address}`);
    } else {
      addLog("❌ Wallet disconnected");
    }
  }, [isConnected, address]);

  const addLog = (message) => {
    setLogs((prev) => [
      { message, timestamp: new Date().toLocaleTimeString() },
      ...prev,
    ]);
    console.log(message); // biar kelihatan di console juga
  };

  return (
    <div style={{ marginTop: 20, padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>Wallet Activity Log</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {logs.map((log, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            <code>[{log.timestamp}]</code> {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
