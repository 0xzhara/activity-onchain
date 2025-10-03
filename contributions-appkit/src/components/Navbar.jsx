import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ConnectButton from "./ConnectButton";
import { Home, ListTodo } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuLinks = [
    { name: "Home", to: "/", icon: <Home size={16} /> },
    { name: "Activity Mainet", to: "/activity", icon: <ListTodo size={16} /> },
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
      {/* Logo / Title */}
      <div style={{ fontWeight: 700, fontSize: 20 }}>Onchain Dashboard</div>

      {/* Tengah: Menu & Theme */}
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
            onClick={() => setIsOpen(false)}
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
