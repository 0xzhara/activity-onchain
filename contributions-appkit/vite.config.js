import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",       // ✅ folder output
    emptyOutDir: true     // hapus isi dist sebelum build baru
  },
  server: {
    port: 5173,           // default dev port
    open: true            // auto buka browser saat `npm run dev`
  },
  preview: {
    port: 4173            // port untuk `npm run preview`
  }
});
