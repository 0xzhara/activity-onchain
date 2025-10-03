import React, { useState } from "react";
import { useWalletClient } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/abi";
import { ethers } from "ethers";
import { useUI } from "../context/UIContext";

export default function SendMessageForm() {
  const [message, setMessage] = useState("");
  const { data: walletClient } = useWalletClient();
  const { showToast } = useUI();

  const handleSend = async () => {
    if (!message) return showToast("Enter a message", "error");
    try {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.sendMessage(message);
      await tx.wait();

      showToast("✅ Message sent", "success");
      setMessage("");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to send message", "error");
    }
  };

  return (
    <div className="form-row">
      <input
        type="text"
        placeholder="Enter message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn-primary" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
