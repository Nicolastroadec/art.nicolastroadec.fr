// vitest.config.ts
import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';
import { resolve } from 'path';


// Charger les variables d'environnement
dotenv.config({ path: '.env.test' });

export default defineConfig({
  resolve: {
    alias: {
      '@lib': resolve(__dirname, 'app/(lib)'),
      '@components': resolve(__dirname, 'app/(ui)/components'),
    },
  },
  test: {
    environment: 'jsdom',
  },
});
