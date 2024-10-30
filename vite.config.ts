import path from 'node:path';
import * as url from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
    },
  },
  resolve: {
    alias: {
      '@assets': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/assets',
      ),
      '@applicationStorage': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/applicationStorage',
      ),
      '@components': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/components',
      ),
      '@features': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/features',
      ),
      '@hooks': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/hooks',
      ),
      '@pages': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/pages',
      ),
      '@src/types': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/types',
      ),
      '@store': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/store',
      ),
      '@styles': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/styles',
      ),
      '@utils': path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'src/utils',
      ),
    },
  },
});
