import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './' // funciona em GitHub Pages sem precisar do nome do repo
})
