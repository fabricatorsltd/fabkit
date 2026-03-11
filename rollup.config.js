import alias from '@rollup/plugin-alias';
import path from 'node:path';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/lib/index.js',
  output: [
    { file: 'dist/index.js', format: 'cjs', sourcemap: true },
    { file: 'dist/index.mjs', format: 'esm', sourcemap: true }
  ],
  plugins: [
    alias({
      entries: [
        { find: '$lib', replacement: path.resolve('src/lib') }
      ]
    }),
    svelte({
      emitCss: false,
      compilerOptions: {
        dev: false,
        css: "injected"
      }
    }),
    resolve({ browser: true, dedupe: ['svelte'] }),
    terser()
  ]
};
