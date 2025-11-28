import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Chronic Care Master',
        short_name: 'ChronicCare',
        description: 'Educational platform for chronic disease management',
        theme_color: '#1e293b',
        background_color: '#0f172a',
        display: 'standalone',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg}'],
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
