import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "same-runtime/dist/jsx-dev-runtime",
      "same-runtime/dist/jsx-runtime",
    ],
  },
  define: {
    // 确保环境变量在构建时可用
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL || 'http://47.242.127.155:8000'),
  },
});
