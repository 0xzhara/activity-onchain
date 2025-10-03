import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const UIContext = createContext();

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (msg, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <UIContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.msg} type={t.type} />
        ))}
      </div>
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
