import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  server: {
    proxy: {
      '/api':{
        target: 'http://localhost:3010',
        changeOrigin: true,
      },
      "/admin": {
        target: 'http://47.110.129.224:9999',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, './index.html'),
      }
    }
  }
})
