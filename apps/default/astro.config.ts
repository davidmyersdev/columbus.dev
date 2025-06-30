import { cloudflare } from '@cloudflare/vite-plugin'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      cloudflare(),
      tailwind(),
    ],
  },
})
