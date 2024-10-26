import { lucia } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	if (locals.session?.id) {
		lucia.invalidateSession(locals.session.id);
	}
	redirect(302, '/admin/login');
};
