import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/signup': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/me': 'http://localhost:3000',
      '/todo': 'http://localhost:3000',
      '/:id/toggle': 'http://localhost:3000',
    }
  }
})
