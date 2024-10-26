// actions.ts
import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Contact } from '@prisma/client';
import { logger } from '$lib/server/logs';

const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};

export const action_delete = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/contact');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const { id } = data;

	if (id == null || id == '') {
		logger.warn({}, "L'identifiant du contact est requis", '/admin/contact');
		return fail(400, {
			data: data,
			errorMsg: "❌ L'identifiant du contact est requis"
		});
	}

	try {
		const contactToDelete: Contact | null = await prisma.contact.findUnique({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		if (contactToDelete == null) {
			logger.warn({}, "Le contact n'existe pas", '/admin/contact');
			return fail(400, {
				data: data,
				errorMsg: "Le contact n'existe pas"
			});
		}

		await prisma.contact.delete({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		return {
			id,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/contact');
		return fail(400, {
			data: data,
			errorMsg: '❌ Une erreur est survenue lors de la suppression du contact'
		});
	}
};
