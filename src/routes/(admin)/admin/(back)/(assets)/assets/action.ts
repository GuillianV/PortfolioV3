// actions.ts
import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { logger } from '$lib/server/logs';
import { unlinkSync } from 'fs';
import { saveAssetUpload } from '$lib/server/assets/asset-upload';
import { AssetsCategories } from '$lib/client/assets/enums';

const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};

export const action_create = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/assets');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = await request.formData();
	const files = data.getAll('assetsFiles');

	try {
		const assets = await Promise.all(
			files.map(async (file) => {
				const savedAsset = await saveAssetUpload(file);
				if (!savedAsset.succes) {
					logger.error(savedAsset.errorMsg, '/admin/assets');
					return;
				}

				return savedAsset.asset;
			})
		);

		return {
			data: assets,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/assets');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue lors de l'enregistrement de l'image"
		});
	}
};

export const action_findall = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/assets');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	try {
		const { request } = event;
		const data = await request.formData();
		const { category } = Object.fromEntries(data);

		let assets;
		if (category == AssetsCategories.FILE)
			assets = await prisma.asset.findMany({
				select: {
					id: true,
					path: true,
					originalFilename: true,
					filename: true,
					extension: true,
					createdAt: true,
					assetCategoryId: true,
					assetCategory: {
						select: {
							name: true
						}
					}
				},
				orderBy: {
					createdAt: 'desc'
				}
			});
		else
			assets = await prisma.asset.findMany({
				select: {
					id: true,
					path: true,
					originalFilename: true,
					filename: true,
					extension: true,
					createdAt: true,
					assetCategoryId: true,

					assetCategory: {
						select: {
							name: true
						}
					}
				},
				where: {
					assetCategory: {
						name: category as string
					}
				},
				orderBy: {
					createdAt: 'desc'
				}
			});

		return {
			data: assets,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/assets');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue l'obtentions des images"
		});
	}
};

export const action_delete = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/assets');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = await request.formData();
	const { id } = Object.fromEntries(data);

	const asset = await prisma.asset.findUnique({
		where: {
			id: id as string
		},
		include: {
			pictureAssets: true
		}
	});

	if (asset == null) {
		logger.warn(data, "L'image n'existe pas", '/admin/assets');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ L'image n'existe pas"
		});
	}

	for (const assetRelation of asset.pictureAssets) {
		try {
			unlinkSync(`${assetRelation.path.slice(1)}`);
		} catch (err) {
			logger.error(err, '/admin/assets?/delete');
		}
	}

	try {
		unlinkSync(`${asset.path.slice(1)}`);
	} catch (err) {
		logger.error(err, '/admin/assets?/delete');
	}

	try {
		await prisma.asset.delete({
			where: {
				id: id as string
			}
		});
	} catch (err) {
		logger.error(err, '/admin/assets?/delete');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue lors de la suppression virtuelle de l'image"
		});
	}

	return {
		data: id,
		errorMsg: undefined
	};
};
