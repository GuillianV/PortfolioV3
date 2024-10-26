import { lucia } from '$lib/server/lucia';
import type { Actions, ServerLoadEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { logger } from '$lib/server/logs/index.js';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	if (event.locals.user) {
		redirect(302, '/admin/home');
	}
	return {};
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = Object.fromEntries(await request.formData());
		const { email, password } = data;

		if (email == null || typeof email !== 'string' || email.length < 1) {
			logger.warn({}, 'Mail incorrect', '/admin/login');
			return fail(400, {
				data: data,
				errorMsg: 'Mail incorrect'
			});
		}

		if (password == null || typeof password !== 'string' || password.length < 1) {
			logger.warn({}, 'Mot de passe incorrect', '/admin/login');
			return fail(400, {
				data: data,
				errorMsg: 'Mot de passe incorrect'
			});
		}

		try {
			const user = await prisma.user.findUnique({
				where: {
					username: email,
					password: password
				}
			});

			if (!user) {
				logger.warn({}, 'Identifiants incorrects', '/admin/login');
				return fail(400, {
					data: data,
					errorMsg: 'Identifiants incorrects'
				});
			}

			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (err) {
			logger.error(err, '/admin/login');
			return fail(400, {
				data: data,
				errorMsg: 'Identifiants incorrects'
			});
		}

		return {
			data,
			errorMsg: undefined
		};
	}
};
