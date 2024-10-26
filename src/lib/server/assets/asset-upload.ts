import { prisma } from '$lib/server/prisma';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { Resolution } from '$lib/client/assets/pictures/resolution';
import { Quality } from '$lib/client/assets/pictures/quality';
import { PUBLIC_UPLOADS_FOLDER_NAME } from '$env/static/public';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { GetExtension, IsPhoto, IsSvg, IsVideo } from '$lib/client/utils/type.js';
import { AssetsCategories } from '$lib/client/assets/enums';
import type { AssetCategory } from '$lib/client/assets/ambiant';
import { logger } from '../logs';

/**
 * @description Save a file to an Asset
 *
 * @example saveAssetUpload(file)
 *
 * @param file {File | null | undefined | FormDataEntryValue}
 * @returns {Promise<{succes: boolean; asset: AssetCategory | null; errorMsg: string;}>}
 */
export async function saveAssetUpload(file: File | null | undefined | FormDataEntryValue): Promise<{
	succes: boolean;
	asset: AssetCategory | null;
	errorMsg: string;
}> {
	if (file == null) {
		return {
			succes: false,
			asset: null,
			errorMsg: "L'image n'existe pas"
		};
	}

	if (!(file instanceof File)) {
		return {
			succes: false,
			asset: null,
			errorMsg: "L'image n'est pas valide"
		};
	}

	try {
		const filepath = `${PUBLIC_UPLOADS_FOLDER_NAME}/assets/`;

		if (!existsSync(filepath)) {
			mkdirSync(filepath);
		}

		const arrayBuffer = await file.arrayBuffer();
		const filename = `${uuid()}`;
		const originalFilename = file.name;
		let extension = '';
		let category = AssetsCategories.FILE;

		if (IsPhoto(file)) {
			extension = 'webp';
			category = AssetsCategories.PICTURE;
			await sharp(arrayBuffer)
				.resize(null, null, {
					fit: 'inside', // 'inside' ensures that the image is not upscaled
					withoutEnlargement: true // Prevent enlargement of smaller images
				})
				.toFormat('webp')
				.toFile(`${filepath}${filename}.${extension}`);
		} else if (IsSvg(file)) {
			extension = 'svg';
			category = AssetsCategories.PICTURE;
			writeFileSync(`${filepath}${filename}.${extension}`, Buffer.from(arrayBuffer));
		} else if (IsVideo(file)) {
			category = AssetsCategories.VIDEO;
			extension = GetExtension(file.name);
			writeFileSync(`${filepath}${filename}.${extension}`, Buffer.from(arrayBuffer));
		} else {
			extension = GetExtension(file.name);
			writeFileSync(`${filepath}${filename}.${extension}`, Buffer.from(arrayBuffer));
		}

		const asset = await prisma.asset.create({
			data: {
				path: `/${filepath}${filename}.${extension}`,
				extension,
				filename,
				originalFilename,
				assetCategory: {
					connect: {
						name: category
					}
				}
			},
			select: {
				id: true,
				path: true,
				extension: true,
				filename: true,
				originalFilename: true,
				createdAt: true,
				assetCategoryId: true,
				assetCategory: {
					select: {
						name: true
					}
				}
			}
		});

		return {
			succes: true,
			asset: asset as AssetCategory,
			errorMsg: ''
		};
	} catch (exeption) {
		logger.warn(exeption, "Erreur lors de la création de l'asset upload");
		return {
			succes: false,
			asset: null,
			errorMsg: ''
		};
	}
}

/**
 * @description Save a file to an Asset
 *
 * @example saveIndependantAssetUpload(file, foldername, resolution, quality)
 *
 * @param file {File | null | undefined | FormDataEntryValue}
 * @param foldername {string}
 * @param resolution {Resolution}
 * @param quality {Quality}
 * @param resizeOptions {sharp.ResizeOptions}
 * @returns {Promise<{succes: boolean; assetPath: string | null; errorMsg: string;}>}
 */
export async function saveIndependantAssetUpload(
	file: File | null | undefined | FormDataEntryValue,
	foldername: string,
	resolution: Resolution,
	quality: Quality,
	resizeOptions: sharp.ResizeOptions = {
		fit: 'inside',
		withoutEnlargement: true
	}
): Promise<{
	succes: boolean;
	assetPath: string | null;
	errorMsg: string;
}> {
	if (file == null) {
		return {
			succes: false,
			assetPath: null,
			errorMsg: "L'image n'existe pas"
		};
	}

	if (!(file instanceof File)) {
		return {
			succes: false,
			assetPath: null,
			errorMsg: "L'image n'est pas valide"
		};
	}

	try {
		const filepath = `${PUBLIC_UPLOADS_FOLDER_NAME}/${foldername}/`;

		if (!existsSync(filepath)) {
			mkdirSync(filepath);
		}

		const arrayBuffer = await file.arrayBuffer();
		const filename = `${uuid()}`;
		let extension = '';

		if (IsPhoto(file)) {
			extension = 'webp';
			await sharp(arrayBuffer)
				.resize(resolution.value(), resolution.value(), resizeOptions)
				.webp({ quality: quality.value() })
				.toFile(`${filepath}${filename}.${extension}`);
		} else if (IsSvg(file)) {
			extension = 'svg';
			writeFileSync(`${filepath}${filename}.${extension}`, Buffer.from(arrayBuffer));
		} else if (IsVideo(file)) {
			extension = GetExtension(file.name);
			writeFileSync(`${filepath}${filename}.${extension}`, Buffer.from(arrayBuffer));
		} else {
			extension = GetExtension(file.name);
			writeFileSync(`${filepath}${filename}.${extension}`, Buffer.from(arrayBuffer));
		}

		return {
			succes: true,
			assetPath: `/${filepath}${filename}.${extension}`,
			errorMsg: ''
		};
	} catch (exeption) {
		logger.warn(exeption, "Erreur lors de la création de l'asset upload indépendant");
		return {
			succes: false,
			assetPath: null,
			errorMsg: ''
		};
	}
}
