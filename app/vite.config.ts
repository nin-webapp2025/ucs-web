import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Static build lands in ../website. base "/" keeps asset URLs root-relative so
// the site works when website/ is served as the web root (Vercel, Netlify, GH
// Pages, etc.); serve.mjs resolves those same /assets/* paths from website/ too.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
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
