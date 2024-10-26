import { getParametre } from '$lib/server/parametres/parametres';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		parametres: {
			PUBLIC_HEAD_TAG_MANAGER: await getParametre('PUBLIC_HEAD_TAG_MANAGER'),
			PUBLIC_BODY_TAG_MANAGER: await getParametre('PUBLIC_BODY_TAG_MANAGER')
		}
	};
};
