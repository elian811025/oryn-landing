import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. 把這個加回來

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. 把這個插件加回來，樣式就會恢復了
  ],
  server: {
    proxy: {
      // 3. 保留這個 Proxy 設定，讓後端 API 能通
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})