import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		backlink: null,
		active: 'home'
	};
};
