// src/components/LoadingOverlay.jsx
import React from "react";
import "./loadingOverlay.css";

export default function LoadingOverlay({ loading, message }) {
  if (!loading) return null;
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
}
