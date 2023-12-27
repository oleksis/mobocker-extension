import {builtinModules} from 'module';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    sourcemap: 'inline',
    target: 'esnext',
    outDir: "dist",
    assetsDir: '.',
    lib: {
      entry: './extension.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [
        '@podman-desktop/api',
        ...builtinModules.flatMap(p => [p, `node:${p}`]),
      ],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  }
});
