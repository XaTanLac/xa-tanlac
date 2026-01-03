import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import path from 'path'
import zaloMiniApp from 'zmp-vite-plugin'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: '.',
    base: '',
    plugins: [react(), tsconfigPaths(), zaloMiniApp()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
}
