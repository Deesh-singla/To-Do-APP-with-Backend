import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/signup': 'https://to-do-app-with-backend.onrender.com',
      '/login': 'https://to-do-app-with-backend.onrender.com',
      '/me': 'https://to-do-app-with-backend.onrender.com',
      '/todo': 'https://to-do-app-with-backend.onrender.com',
      '/:id/toggle': 'https://to-do-app-with-backend.onrender.com',
    }
  }
})
