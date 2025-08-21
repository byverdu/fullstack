import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [react()],
    root: resolve(__dirname, "src/react"),
    build: {
      outDir: resolve(__dirname, "src/client"),
      minify: true,
      emptyOutDir: false,
      rollupOptions: {
        input: resolve(__dirname, "src/react/index.html"),
        output: {
          entryFileNames: "index.js",
        },
      },
    },
    server: {
      port: 5173,
      proxy: {
        // Proxy all API calls to the backend server
        "/users": {
          target: "http://localhost:9696",
          changeOrigin: true,
        },
        "/accounts": {
          target: "http://localhost:9696",
          changeOrigin: true,
        },
        "/creditCards": {
          target: "http://localhost:9696",
          changeOrigin: true,
        },
      },
    },
  };
});
