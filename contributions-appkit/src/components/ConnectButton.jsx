import React from "react";
import { AppKitButton } from "@reown/appkit/react";

export default function ConnectButton() {
  return (
    <div style={{ marginBottom: "12px" }}>
      {/* Ini tombol bawaan dari AppKit (WalletConnect modal) */}
      <AppKitButton label="Connect Wallet" />
    </div>
  );
}
