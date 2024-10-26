import { prisma } from '$lib/server/prisma';
import type { Actualite, FileAsset, PictureAsset, VideoAsset } from '@prisma/client';
import { action_upsert, action_delete } from '../../actions.js';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
	const { params } = event;
	const { id = '' } = params;

	const actualite: Actualite | null = await prisma.actualite.findUnique({
		where: {
			id
		}
	});

	const pictureAsset = await prisma.pictureAsset.findUnique({
		where: {
			id: actualite?.pictureAssetId_Principale ?? ''
		}
	});

	const fileAsset = await prisma.fileAsset.findUnique({
		where: {
			id: actualite?.fileAssetId_Externe ?? ''
		}
	});

	const videoAsset = await prisma.videoAsset.findUnique({
		where: {
			id: actualite?.videoAssetId_Slide ?? ''
		}
	});

	return {
		backlink: '/admin/actualites',
		active: 'actualites',
		actualite: actualite as Actualite | null,
		pictureAsset: pictureAsset as PictureAsset | null,
		fileAsset: fileAsset as FileAsset | null,
		videoAsset: videoAsset as VideoAsset | null
	};
};

export const actions: Actions = {
	upsert: action_upsert,
	delete: action_delete
};
