import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import LoadingOverlay from "../components/LoadingOverlay";

const UIContext = createContext();

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState({ active: false, message: "" });

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const showLoading = (msg = "Processing...") => setLoading({ active: true, message: msg });
  const hideLoading = () => setLoading({ active: false, message: "" });

  return (
    <UIContext.Provider value={{ addToast, showLoading, hideLoading }}>
      {children}
      <LoadingOverlay loading={loading.active} message={loading.message} />
      <div className="toast-container">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
