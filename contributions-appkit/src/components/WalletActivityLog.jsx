// src/components/WalletActivityLog.jsx
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Skeleton from "./Skeleton"; // ✅ pastikan file Skeleton.jsx ada

export default function WalletActivityLog() {
  const { address, isConnected } = useAccount();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ untuk skeleton

  const addLog = (message) => {
    setLogs((prev) => [
      { message, timestamp: new Date().toLocaleTimeString() },
      ...prev,
    ]);
    console.log(message);
  };

  useEffect(() => {
    // simulasi delay fetch log
    const timer = setTimeout(() => {
      if (isConnected) {
        addLog(`✅ Wallet connected: ${address}`);
      } else {
        addLog("❌ Wallet disconnected");
      }
      setLoading(false); // ✅ setelah fetch selesai
    }, 1500);

    return () => clearTimeout(timer);
  }, [isConnected, address]);

  return (
    <div style={{ marginTop: 20, padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>Wallet Activity Log</h3>

      {loading ? (
        <div style={{ display: "grid", gap: "10px" }}>
          <Skeleton width="70%" height="14px" />
          <Skeleton width="80%" height="14px" />
          <Skeleton width="50%" height="14px" />
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {logs.map((log, i) => (
            <li key={i} style={{ marginBottom: 6 }}>
              <code>[{log.timestamp}]</code> {log.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
