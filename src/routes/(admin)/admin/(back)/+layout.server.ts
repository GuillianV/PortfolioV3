import type { ServerLoadEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './home/$types';
import config from './layout.conf.json';
import type { LayoutConfig } from '$lib/client/utils/ambiant';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	if (!event.locals.user) {
		redirect(302, '/admin/login');
	}
	return {
		config: config as LayoutConfig
	};
};
