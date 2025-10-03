import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="btn-primary theme-toggle"
      onClick={() => setDark(!dark)}
      style={{ display: "flex", alignItems: "center", gap: "6px" }}
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
