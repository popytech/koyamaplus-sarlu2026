import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Change '/' par '/app/' si c'est une sous-URL
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
