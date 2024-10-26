import { prisma } from '$lib/server/prisma';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { Resolution, resolutionMax } from '$lib/client/assets/pictures/resolution';
import { Quality, quality100 } from '$lib/client/assets/pictures/quality';
import { PUBLIC_UPLOADS_FOLDER_NAME } from '$env/static/public';
import sharp from 'sharp';
import type { PictureAsset } from '@prisma/client';
import { logger } from '$lib/server/logs';

/**
 * @description Save a PictureAsset from an Asset
 *
 * @example savePictureAsset('4e5508fd-979d-47ad-a56b-e9a604d02f1f', {resolution: 'max', quality: '100'})
 *
 * @param assetID {string | FormDataEntryValue}
 * @param assetRelationOptions {{resolution?: Resolution | number | string | FormDataEntryValue | null; quality?: Quality | number | FormDataEntryValue | string; required?: boolean;}}
 * @param resizeOptions {sharp.ResizeOptions}
 * @returns {Promise<{succes: boolean; relation: PictureAsset | null; errorMsg: string; errorPass: boolean;}>}
 */
export async function savePictureAsset(
	assetID: string | FormDataEntryValue,
	assetRelationOptions: {
		resolution?: Resolution | number | string | FormDataEntryValue | null;
		quality?: Quality | number | FormDataEntryValue | string;
		required?: boolean;
	} = {
		resolution: resolutionMax,
		quality: quality100,
		required: true
	},
	resizeOptions: sharp.ResizeOptions = {
		fit: 'inside',
		withoutEnlargement: true
	}
): Promise<{
	succes: boolean;
	relation: PictureAsset | null;
	errorMsg: string;
	errorPass: boolean;
}> {
	const {
		required = false,
		resolution = resolutionMax,
		quality = quality100
	} = assetRelationOptions;

	try {
		const asset = await prisma.asset.findUnique({
			where: {
				id: assetID.toString()
			}
		});

		if (asset == null) {
			return {
				succes: false,
				errorPass: !required,
				relation: null,
				errorMsg: "L'image n'existe pas"
			};
		}

		const absoluteResolution: Resolution = Resolution.fromInput(resolution?.toString());
		const absoluteQuality: Quality = Quality.fromInput(quality?.toString());

		const arrayBuffer = readFileSync(`${asset.path.slice(1)}`);
		const filepath = `${PUBLIC_UPLOADS_FOLDER_NAME}/assets/${absoluteResolution.toString()}/${absoluteQuality.toString()}/`;

		if (!existsSync(filepath)) {
			mkdirSync(filepath, { recursive: true });
		}

		let filename = `${asset.id}`;

		if (asset.extension !== 'svg') {
			filename += '.webp';

			await sharp(arrayBuffer)
				.resize(absoluteResolution.value(), absoluteResolution.value(), resizeOptions)
				.webp({ quality: absoluteQuality.value() })
				.toFile(`${filepath}${filename}`);
		} else {
			filename += '.svg';
			writeFileSync(`${filepath}${filename}`, Buffer.from(arrayBuffer));
		}

		let pictureAsset = await prisma.pictureAsset.findFirst({
			where: {
				quality: absoluteQuality.value(),
				resolution: absoluteResolution.value(),
				asset: {
					id: asset.id
				}
			}
		});

		if (pictureAsset == null) {
			pictureAsset = await prisma.pictureAsset.create({
				data: {
					quality: absoluteQuality.value(),
					resolution: absoluteResolution.value(),
					path: `/${filepath}${filename}`,
					asset: {
						connect: {
							id: asset.id
						}
					}
				}
			});
		}

		return { succes: true, errorPass: false, relation: pictureAsset, errorMsg: '' };
	} catch (exeption) {
		logger.warn(exeption, "Erreur lors de la création de l'asset picture");
		return { succes: false, errorPass: !required, relation: null, errorMsg: '' };
	}
}
