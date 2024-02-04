import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    VueDevTools(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: ['./src/stores', './src/use', './src/configs', './src/api'],
      dts: true,
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
