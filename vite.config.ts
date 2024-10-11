import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost',
    port: 5173,
    cors: true,
    proxy: {
      '/app': {//获取路径中包含了/app的请求
        target: 'http://localhost:51600',//网关所在地址
        changeOrigin: true,//修改源
        rewrite: (path) => path.replace(/^\/app/, '')//app替换为''
      }
    }
  }
})
