import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UIProvider } from "./context/UIContext";
import { LogProvider } from "./context/LogContext";
import HomeStats from "./components/HomeStats";
import Activity from "./pages/Activity";
import Proposals from "./pages/Proposals"; // ✅ import

export default function App() {
  return (
    <UIProvider>
      <LogProvider>
        <div style={{ fontFamily: "Inter, Arial, sans-serif", maxWidth: 900, margin: "0 auto" }}>
          <Navbar />

          <Routes>
            <Route path="/" element={
              <div className="card">
                <h2>Dashboard</h2>
                <HomeStats />
              </div>
            } />

            <Route path="/activity" element={<Activity />} />
            <Route path="/proposals" element={<Proposals />} /> {/* ✅ route baru */}
          </Routes>
        </div>
      </LogProvider>
    </UIProvider>
  );
}
