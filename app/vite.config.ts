import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Static build lands in ../website so the project's serve.mjs
// (which maps "/" -> website/index.html and serves the repo root)
// resolves /website/assets/* correctly on localhost:3000.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/website/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "../website",
    emptyOutDir: true,
  },
})
