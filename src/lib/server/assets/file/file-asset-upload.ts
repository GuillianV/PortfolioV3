import { prisma } from '$lib/server/prisma';
import { IsEmptyString } from '$lib/client/utils/type.js';
import type { FileAsset } from '@prisma/client';
import { logger } from '$lib/server/logs';

/**
 * @description Save a FileAsset from an Asset
 *
 * @example saveFileAsset('4e5508fd-979d-47ad-a56b-e9a604d02f1f', {name: 'file.pdf'})
 *
 * @param assetID {string | FormDataEntryValue}
 * @param assetRelationOptions {{name?: string | FormDataEntryValue | null; required?: boolean;}}
 * @returns {Promise<{succes: boolean; relation: FileAsset | null; errorMsg: string; errorPass: boolean;}>}
 */
export async function saveFileAsset(
	assetID: string | FormDataEntryValue,
	assetRelationOptions: {
		name?: string | FormDataEntryValue | null;
		required?: boolean;
	} = {
		name: '',
		required: true
	}
): Promise<{
	succes: boolean;
	relation: FileAsset | null;
	errorMsg: string;
	errorPass: boolean;
}> {
	let { name = '' } = assetRelationOptions;
	const { required = true } = assetRelationOptions;
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
				errorMsg: "Le fichier n'existe pas"
			};
		}

		if (IsEmptyString(name)) {
			name = asset.originalFilename;
		}

		let fileAsset = await prisma.fileAsset.findFirst({
			where: {
				name: name as string,
				asset: {
					id: asset.id
				}
			}
		});

		if (fileAsset == null) {
			fileAsset = await prisma.fileAsset.create({
				data: {
					name: name as string,
					path: asset.path,
					asset: {
						connect: {
							id: asset.id
						}
					}
				}
			});
		}

		return { succes: true, errorPass: false, relation: fileAsset, errorMsg: '' };
	} catch (exeption) {
		logger.warn(exeption, "Erreur lors de la création de l'asset upload");
		return { succes: false, errorPass: !required, relation: null, errorMsg: '' };
	}
}
