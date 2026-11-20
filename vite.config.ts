import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replaceAll('\\', '/')
          if (moduleId.includes('/node_modules/react') || moduleId.includes('/node_modules/scheduler')) return 'react-vendor'
          if (moduleId.includes('/node_modules/framer-motion') || moduleId.includes('/node_modules/motion-')) return 'motion-vendor'
          if (moduleId.includes('/node_modules/gsap/')) return 'scroll-motion'
        },
      },
    },
  },
})
