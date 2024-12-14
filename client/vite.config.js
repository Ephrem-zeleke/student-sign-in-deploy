import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy: {
      '/api': 'http://localhost:3000' // this means, any time the vue app makes a request to anything that has
      // an api/ the vite server is going to send that request to our express server
    }
  }
})
