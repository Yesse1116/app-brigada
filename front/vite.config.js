import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], server: {
    port: 5173, // Cambia si necesitas un puerto diferente
    host: true, // Esto permite que la app sea accesible desde una red local
},
});

