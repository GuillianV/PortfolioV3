import { action_delete } from '../actions';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export type ActualiteListing = {
	id: string;
	titre: string;
	pictureAssetId_Principale: string;
	redacteur: string;
	tempsLecture: string;
	descriptionCourte: string;
	contenu: string;
	createdAt: Date;
	photo: string | null;
};

export const load: PageServerLoad = async () => {
	const actualites: ActualiteListing[] = await Promise.all(
		(await prisma.actualite.findMany()).map(async (actualite) => {
			const pictureAsset = await prisma.pictureAsset.findUnique({
				where: {
					id: actualite.pictureAssetId_Principale
				}
			});

			return { ...actualite, photo: pictureAsset?.path } as ActualiteListing;
		})
	);

	return {
		backlink: '/admin/home',
		active: 'actualites',
		actualites
	};
};

export const actions: Actions = {
	delete: action_delete
};
