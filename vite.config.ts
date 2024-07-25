// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
// import Checker from 'vite-plugin-checker';

// // https://vitejs.dev/config/


// export default ({ mode }) => {
//   process.env = {...process.env, ...loadEnv(mode, process.cwd())};
//   return defineConfig({
//     plugins: [react(),
//       Checker({
//         typescript: true,
//         overlay: true,
//       })],
//   });
// }

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Checker from 'vite-plugin-checker'

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      react(),
      Checker({
        typescript: true,
        overlay: true,
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
      chunkSizeWarningLimit: 2000, // Increase the chunk size warning limit to 1000 kB
    },
  })
}
