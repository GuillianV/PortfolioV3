// initScriptPlugin.ts
import { initialize } from './parametres.js';

export default () => {
	return {
		name: 'run-init-script',
		async buildStart() {
			await initialize();
		}
	};
};
