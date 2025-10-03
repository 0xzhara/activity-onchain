// src/context/LogContext.jsx
import React, { createContext, useContext, useState } from "react";

const LogContext = createContext();

export function LogProvider({ children }) {
  const [walletLogs, setWalletLogs] = useState([]);
  const [contractLogs, setContractLogs] = useState([]);

  const addWalletLog = (msg) => {
    setWalletLogs((prev) => [
      { msg, timestamp: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  };

  const addContractLog = (msg) => {
    setContractLogs((prev) => [
      { msg, timestamp: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  };

  return (
    <LogContext.Provider value={{ walletLogs, contractLogs, addWalletLog, addContractLog }}>
      {children}
    </LogContext.Provider>
  );
}

export const useLog = () => useContext(LogContext);
