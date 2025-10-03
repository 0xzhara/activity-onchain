// src/components/HomeStats.jsx
import React, { useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/abi";
import { ethers } from "ethers";

export default function HomeStats() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [xp, setXp] = useState(0);
  const [balance, setBalance] = useState("0");
  const [streak, setStreak] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);

  // Ambil check-in count dari kontrak
  useEffect(() => {
    const loadData = async () => {
      if (!isConnected || !walletClient) return;
      try {
        const provider = new ethers.BrowserProvider(walletClient);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const count = await contract.checkInCount(address);
        setXp(Number(count));

        const bal = await provider.getBalance(address);
        setBalance(ethers.formatEther(bal));

        // Daily streak dari localStorage
        const streakData = JSON.parse(localStorage.getItem("streakData") || "{}");
        if (streakData[address]) {
          setStreak(streakData[address].streak);
          setLastCheckIn(streakData[address].lastDate);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [isConnected, walletClient, address]);

  // Fungsi update streak setelah check-in
  const updateStreak = () => {
    const today = new Date().toDateString();
    let newStreak = 1;

    if (lastCheckIn) {
      const lastDate = new Date(lastCheckIn);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastDate.toDateString() === yesterday.toDateString()) {
        newStreak = streak + 1; // lanjut streak
      } else if (lastDate.toDateString() === today) {
        newStreak = streak; // sudah check-in hari ini
      } else {
        newStreak = 1; // reset streak
      }
    }

    setStreak(newStreak);
    setLastCheckIn(today);

    // Simpan ke localStorage
    const streakData = JSON.parse(localStorage.getItem("streakData") || "{}");
    streakData[address] = { streak: newStreak, lastDate: today };
    localStorage.setItem("streakData", JSON.stringify(streakData));
  };

  // Cek kalau XP bertambah (berarti habis check-in) → update streak
  useEffect(() => {
    if (xp > 0) updateStreak();
  }, [xp]);

  // Level system sederhana
  const getLevelInfo = (xp) => {
    if (xp < 10) return { level: 1, max: 10 };
    if (xp < 25) return { level: 2, max: 25 };
    if (xp < 50) return { level: 3, max: 50 };
    return { level: 4, max: 100 };
  };

  const { level, max } = getLevelInfo(xp);
  const progress = Math.min((xp / max) * 100, 100);

  return (
    <div className="card" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      {/* Avatar */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "#2563eb",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        {level}
      </div>

      {/* Stats */}
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0 }}>Level {level}</h3>
        <p style={{ margin: "4px 0" }}>XP: {xp} / {max}</p>
        <div style={{ background: "#eee", borderRadius: "6px", height: "10px", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, background: "#2563eb", height: "100%" }}></div>
        </div>

        {/* Daily streak */}
        <p style={{ marginTop: 8 }}>
          🔥 Daily Streak: <strong>{streak} days</strong>
        </p>

        {/* Wallet balance */}
        <p>Balance: {parseFloat(balance).toFixed(4)} ETH</p>
      </div>
    </div>
  );
}
