import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入Element Plus的自动按需引入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动导入Element Plus相关函数
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // 自动导入Element Plus组件
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 确保所有Three.js导入都使用同一个实例
      'three': fileURLToPath(new URL('./node_modules/three', import.meta.url))
    },
  },
  // 优化依赖，防止重复导入Three.js
  optimizeDeps: {
    include: [
      'three',
      '@photo-sphere-viewer/core',
      '@photo-sphere-viewer/equirectangular-video-adapter',
      '@photo-sphere-viewer/video-plugin',
      '@photo-sphere-viewer/markers-plugin'
    ],
    exclude: ['three/addons']
  },
})
