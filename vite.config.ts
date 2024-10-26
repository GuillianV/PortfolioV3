import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import authKit from './conf/auth/auth.config';
import parametresKit from './conf/parametres/parametres.config';
import assetsKit from './conf/assets/asset.config';
import googleapisKit from './conf/googleapis/googleapis.config';
export default defineConfig({
	plugins: [sveltekit(), authKit(), parametresKit(), assetsKit(), googleapisKit()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	},
	server: {
		hmr: false,
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()) + '/uploads']
		}
	}
});
