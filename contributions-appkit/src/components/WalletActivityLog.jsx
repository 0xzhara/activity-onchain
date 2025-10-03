import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useLog } from "../context/LogContext";

export default function WalletActivityLog() {
  const { address, isConnected } = useAccount();
  const { walletLogs, addWalletLog } = useLog();

  useEffect(() => {
    if (isConnected) {
      addWalletLog(`✅ Wallet connected: ${address}`);
    } else {
      addWalletLog("❌ Wallet disconnected");
    }
  }, [isConnected, address]);

  return (
    <div>
      <h3>Wallet Activity Log</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {walletLogs.map((log, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            <code>[{log.timestamp}]</code> {log.msg}
          </li>
        ))}
      </ul>
    </div>
  );
}
