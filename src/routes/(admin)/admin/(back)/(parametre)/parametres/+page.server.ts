import { action_update } from '../actions';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import type { Parametre } from '@prisma/client';

export const load: PageServerLoad = async () => {
	const parametres: Parametre[] = await prisma.parametre.findMany({
		orderBy: {
			order: 'asc'
		}
	});

	return {
		backlink: '/admin/home',
		active: 'parametres',
		parametres
	};
};

export const actions: Actions = {
	update: action_update
};
