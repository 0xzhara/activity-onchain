import React from "react";
import { useAccount, useBalance } from "wagmi";

export default function AccountInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected) {
    return <p><strong>Account:</strong> Not connected</p>;
  }

  return (
    <div>
      <p><strong>Account:</strong> {address}</p>
      <p><strong>Balance:</strong> {balance ? `${balance.formatted} ${balance.symbol}` : "Loading..."}</p>
    </div>
  );
}
