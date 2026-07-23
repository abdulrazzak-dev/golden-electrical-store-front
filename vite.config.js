import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/golden-electrical-store-front/', // ⚠️ இரண்டு பக்கமும் சாய்வு கோடு (slash) இருக்க வேண்டும்
})