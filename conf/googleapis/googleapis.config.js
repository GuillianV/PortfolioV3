import { initialize } from './googleapis.js';

export default () => {
	return {
		name: 'run-init-script',
		async buildStart() {
			await initialize();
		}
	};
};
