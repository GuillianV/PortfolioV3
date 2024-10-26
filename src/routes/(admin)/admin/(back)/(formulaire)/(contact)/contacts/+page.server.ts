import { action_delete } from '../actions';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import type { Contact } from '@prisma/client';

export const load: PageServerLoad = async () => {
	const contacts: Contact[] = await prisma.contact.findMany();

	return {
		backlink: '/admin/home',
		active: 'contacts',
		contacts
	};
};

export const actions: Actions = {
	delete: action_delete
};
