import {builtinModules} from 'module';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    target: 'esnext',
    outDir: "dist",
    rollupOptions: {
      external: [
        '@podman-desktop/api',
        ...builtinModules.flatMap(p => [p, `node:${p}`]),
      ]
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  }
});
