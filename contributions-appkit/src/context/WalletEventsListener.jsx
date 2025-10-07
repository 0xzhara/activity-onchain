import { useEffect, useState } from "react";
import { useAccount, useDisconnect, useChainId } from "wagmi";

// ✅ Simpan event ke localStorage
const saveEvent = (type, details) => {
  const prevLogs = JSON.parse(localStorage.getItem("walletLogs")) || [];
  const newLog = {
    type,
    details,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem("walletLogs", JSON.stringify([newLog, ...prevLogs]));
};

export const WalletEventsListener = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId(); // 🟢 pengganti useNetwork()
  const { disconnect } = useDisconnect();

  const [status, setStatus] = useState("disconnected");

  useEffect(() => {
    try {
      if (isConnected && address) {
        setStatus("connected");
        saveEvent("CONNECTED", { address, chainId });
        console.log(`✅ Connected: ${address} (Chain ID: ${chainId})`);
      } else {
        setStatus("disconnected");
        saveEvent("DISCONNECTED", {});
        console.log("❌ Disconnected");
      }
    } catch (err) {
      console.error("WalletEventsListener error:", err);
    }
  }, [isConnected, address, chainId]);

  // 🌐 Deteksi perubahan chain
  useEffect(() => {
    if (isConnected && chainId) {
      saveEvent("CHAIN_SWITCH", { chainId });
      console.log(`🌐 Switched to chain: ${chainId}`);
    }
  }, [chainId]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "12px",
        right: "12px",
        backgroundColor:
          status === "connected"
            ? "rgba(0,200,100,0.9)"
            : "rgba(200,50,50,0.9)",
        color: "white",
        padding: "10px 16px",
        borderRadius: "12px",
        fontWeight: "500",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        transition: "0.3s ease",
        zIndex: 9999,
      }}
    >
      {status === "connected"
        ? "🟢 Wallet Connected"
        : "🔴 Wallet Disconnected"}
    </div>
  );
};
