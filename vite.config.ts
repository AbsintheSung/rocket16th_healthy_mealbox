import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 加載環境變數
dotenv.config();

// 使用環境變數
const baseURL = process.env.VITE_APP_API_URL;
const apiName = process.env.VITE_APP_API_NAME;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass", directives: true, })],
    }),

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/assets/styles/element-theme/themeColor.scss" as *;`,
        additionalData: `@use "@/assets/styles/index.scss" as *;`,
      },
    },
  },
  server: {
    proxy: {
      [`/${apiName}`]: {
        target: baseURL,
        changeOrigin: true,
        // 如果有字串需要替換可以加入 rewrite 這個屬性
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/Images': {
        target: baseURL,
        changeOrigin: true,
      }
    },
  },
})
