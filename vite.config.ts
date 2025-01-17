import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/metronic8/react/demo8/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html', // Ensures index.html is treated as the entry
    },
  },
})
