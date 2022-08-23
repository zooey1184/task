import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: '/web3bet/dist/',
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  server: {
    proxy: {
      '/v1': 'http://47.242.226.50:7020',
      '/v2': 'http://47.242.226.50:7020'
    }
  },
  build: {
    rollupOptions: {
      input: {
        // web: path.resolve(__dirname, './web.html'),
        // bet: path.resolve(__dirname, './bet.html'),
        // index: path.resolve(__dirname, './index.html'),
        // index: path.resolve(__dirname, './sport.html'),
        index: path.resolve(__dirname, './index.html'),
      }
    }
  }
})
