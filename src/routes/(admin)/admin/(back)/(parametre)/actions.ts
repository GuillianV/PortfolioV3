// actions.ts
import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { IsEmptyString } from '$lib/client/utils/type.js';
import { logger } from '$lib/server/logs';

const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};
export const action_update = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/parametre');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const { key, value } = data;

	if (IsEmptyString(key)) {
		logger.warn({}, 'La clé ne doit pas être vide', '/admin/parametre');
		return fail(400, {
			data: data,
			errorMsg: '❌ La clé ne doit pas être vide'
		});
	}

	await prisma.parametre.update({
		where: {
			key: key as string
		},
		data: {
			value: value as string
		}
	});
};
