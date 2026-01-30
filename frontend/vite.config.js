import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 50387,
    https: { key: fs.readFileSync("../../../../mkcert/localhost-key.pem"), cert: fs.readFileSync("../../../../mkcert/localhost.pem") },
  },
})
