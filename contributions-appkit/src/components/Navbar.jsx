import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ConnectButton from "./ConnectButton";   // ✅ Tambahkan ini

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuLinks = [
    { name: "Home", to: "/" },
    { name: "Activity", to: "/activity" },
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
              textDecoration: "none",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "#2563eb" : "inherit",
            })}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </NavLink>
        ))}

        {/* ✅ Connect Wallet di Navbar */}
        <ConnectButton />

        <ThemeToggle />
      </div>
    </nav>
  );
}
