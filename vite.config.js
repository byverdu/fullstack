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
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, "src/react/index.html"),
        output: {
          entryFileNames: "index-[hash].js",
          chunkFileNames: "chunk-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },
    },
  };
});
