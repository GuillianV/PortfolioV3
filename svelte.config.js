import adapterNode from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess({})],

	kit: {
		csrf: {
			checkOrigin: false
		},
		csp: {},
		adapter: adapterNode({
			out: 'build-node', //Must be the same name as the one in dockerfile COPY --from=build /app/build-node
			precompress: false,
			polyfill: true,
			envPrefix: ''
		}),
		prerender: {
			crawl: true
		}
	}
};

export default config;
