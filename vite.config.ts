import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    global: {},
  },
})
