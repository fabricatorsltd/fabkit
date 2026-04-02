import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [
				// allow serving files from the root docs directory
				path.resolve('../../docs'),
				// allow serving files from the root node_modules and src
				path.resolve('../..')
			]
		}
	}
});
