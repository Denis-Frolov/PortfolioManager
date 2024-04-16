import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: "node_modules/.cacheDir",
  plugins: [
    react(),
    federation({
      name: 'assetWebUi',
      remotes: {
        assetPersistence: 'http://localhost:3200/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
