import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // <-- Diese Zeile muss da sein!

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), // <-- Diese Zeile aktiviert den Motor!
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})