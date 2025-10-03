import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Proposals", href: "#proposals", id: "proposals" },
    { name: "Messages", href: "#messages", id: "messages" },
    { name: "Activity", href: "#activity", id: "activity" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let current = "home";
      menuLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section && section.offsetTop <= scrollPosition) current = link.id;
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid #ccc",
        position: "sticky",
        top: 0,
        background: "inherit",
        zIndex: 100,
      }}
    >
      {/* Logo kiri */}
      <h2 style={{ margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
        🌐 Onchain <span style={{ fontWeight: "700" }}>Dashboard</span>
      </h2>

      {/* Tombol hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`hamburger ${isOpen ? "open" : ""}`}
        style={{
          display: "none",
          background: "transparent",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          color: "inherit", // ikut warna teks body
        }}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Menu desktop */}
      <div className="menu-desktop" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {menuLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            style={{
              textDecoration: "none",
              fontWeight: activeSection === link.id ? "700" : "500",
              color: activeSection === link.id ? "#2563eb" : "inherit",
              borderBottom: activeSection === link.id ? "2px solid #2563eb" : "none",
              paddingBottom: "2px",
            }}
          >
            {link.name}
          </a>
        ))}
        <ThemeToggle />
      </div>

      {/* Menu mobile */}
      <div className={`menu-mobile ${isOpen ? "open" : ""}`}>
        {menuLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            style={{
              textDecoration: "none",
              fontWeight: activeSection === link.id ? "700" : "500",
              color: activeSection === link.id ? "#2563eb" : "inherit",
            }}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
