import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/golden-electrical-store-front/', // ⚠️ இரண்டு பக்கமும் சாய்வு கோடு (slash) இருக்க வேண்டும்
})