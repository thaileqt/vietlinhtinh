import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import paths from './src/commons/paths'

// https://vitejs.dev/config/
export default defineConfig({

   
  // disable cors

  // server: {
  //   proxy: {
  //     '/api': {
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       // secure: false,
  //       // other options if needed
  //     },
  //   },
  // },
  plugins: [react()], 
  build: { chunkSizeWarningLimit: 1000}
})


