import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// // --------------------plugins--------------------

// type Env = Record<string, string>

// const envPlugin = (env: Env) => ({
//    name: 'env',
//    transform: () => {
//       Environment.config(env)
//    },
// })

// --------------------config--------------------

export default defineConfig(({}) => {
   return {
      plugins: [tsconfigPaths(), react({ babel: { plugins: [['babel-plugin-styled-components']] } })],
      server: {
         host: true,
         port: 3000,
         open: true,
         proxy: { '/trpc': { target: 'http://localhost:3001' } },
      },
   }
})
