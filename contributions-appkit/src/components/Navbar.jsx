import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ConnectButton from "./ConnectButton";
import { Home, ListTodo, ScrollText } from "lucide-react"; // ✅ ScrollText untuk icon proposal

export default function Navbar() {
  const menuLinks = [
    { name: "Home", to: "/", icon: <Home size={16} /> },
    { name: "Activity", to: "/activity", icon: <ListTodo size={16} /> },
    { name: "Proposals", to: "/proposals", icon: <ScrollText size={16} /> }, // ✅ baru
  ];

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "16px 0",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 20 }}>Onchain Dashboard</div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {menuLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: 600,
              background: isActive ? "#2563eb" : "#2d2d2d",
              color: isActive ? "#fff" : "#ccc",
              transition: "all 0.2s ease-in-out",
            })}
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
        <ThemeToggle />
      </div>

      {/* Kanan: Connect Wallet */}
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
}
