import React from "react";
import "./skeleton.css";

export default function Skeleton({ width = "100%", height = "16px", style = {} }) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius: "6px",
        ...style,
      }}
    />
  );
}
