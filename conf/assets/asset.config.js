import { initialize } from './asset.js';

export default () => {
	return {
		name: 'run-init-script',
		async buildStart() {
			await initialize();
		}
	};
};
