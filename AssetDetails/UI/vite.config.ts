import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";


// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: "node_modules/.cacheDir",
  plugins: [
    react(),
    federation({
      name: 'assetDetails',
      filename: 'remoteEntry.js',
      exposes: {
        "./App": "./src/App",
      },
      shared: ['react', 'react-dom']
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
