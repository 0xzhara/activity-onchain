// src/components/ContractActivityLog.jsx
import React from "react";
import { useLog } from "../context/LogContext";

export default function ContractActivityLog() {
  const { contractLogs } = useLog();

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {contractLogs.map((log, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            <code>[{log.timestamp}]</code> {log.msg}
          </li>
        ))}
      </ul>
    </div>
  );
}
