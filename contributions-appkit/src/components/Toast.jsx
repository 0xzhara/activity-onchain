// src/components/Toast.jsx
import React, { useEffect } from "react";
import "./toast.css";

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === "success" && "✅ "}
      {type === "error" && "❌ "}
      {type === "info" && "ℹ️ "}
      {message}
    </div>
  );
}
