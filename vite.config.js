import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      // Questa è la magia: mappa il nome della lib direttamente ai sorgenti
      'fabkit-lib': path.resolve('../src/lib')
    }
  },
  server: {
    warmup: {
      // Pre-compila tutti i componenti della lib all'avvio del server così
      // il primo caricamento non deve aspettare la compilazione JIT di Svelte
      clientFiles: [
        './src/lib/index.js',
        './src/lib/*.js',
        './src/lib/components/*.svelte',
        './src/lib/icons/*.svelte',
      ]
    },
    fs: {
      // Permette a Vite di servire file che sono fuori dalla root di "examples"
      allow: ['..']
    }
  }
});