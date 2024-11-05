import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  // 引入框架插件
  plugins: [react()],
  resolve: {
    // 配置别名
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      }
    ]
  },
  // 设置反向代理服务器
  server: {
    // 代理服务器支持设置多个访问目标
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/mock': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, '')
      }
    }
  }
})
