import { logger } from '$lib/server/logs';
import { prisma } from '$lib/server/prisma';
import type { VideoAsset } from '@prisma/client';

/**
 * @description Save a VideoAsset from an Asset
 *
 * @example saveVideoAsset('4e5508fd-979d-47ad-a56b-e9a604d02f1f', {controls: 'on', autoplay: 'on', loop: 'on'})
 *
 * @param assetID {string | FormDataEntryValue}
 * @param assetRelationOptions {{controls?: boolean | FormDataEntryValue | null; autoplay?: boolean | FormDataEntryValue | null; loop?: boolean | FormDataEntryValue | null; name?: string | FormDataEntryValue | null; required?: boolean;}}
 * @returns {Promise<{succes: boolean; relation: VideoAsset | null; errorMsg: string; errorPass: boolean;}>}
 */
export async function saveVideoAsset(
	assetID: string | FormDataEntryValue,
	assetRelationOptions: {
		controls?: boolean | FormDataEntryValue | null;
		autoplay?: boolean | FormDataEntryValue | null;
		loop?: boolean | FormDataEntryValue | null;
		name?: string | FormDataEntryValue | null;
		required?: boolean;
	} = {
		controls: false,
		autoplay: false,
		loop: false,
		required: true
	}
): Promise<{
	succes: boolean;
	relation: VideoAsset | null;
	errorMsg: string;
	errorPass: boolean;
}> {
	let { controls = false, autoplay = false, loop = false } = assetRelationOptions;
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
				errorMsg: "La video n'existe pas"
			};
		}

		if (controls == null) {
			controls = false;
		}

		if (typeof controls == 'string') {
			controls = controls == 'on';
		}

		if (autoplay == null) {
			autoplay = false;
		}

		if (typeof autoplay == 'string') {
			autoplay = autoplay == 'on';
		}

		if (loop == null) {
			loop = false;
		}

		if (typeof loop == 'string') {
			loop = loop == 'on';
		}

		let videoAsset = await prisma.videoAsset.findFirst({
			where: {
				controls: controls as boolean,
				autoplay: autoplay as boolean,
				loop: loop as boolean,
				asset: {
					id: asset.id
				}
			}
		});

		if (videoAsset == null) {
			videoAsset = await prisma.videoAsset.create({
				data: {
					controls: controls as boolean,
					autoplay: autoplay as boolean,
					loop: loop as boolean,
					path: asset.path,
					asset: {
						connect: {
							id: asset.id
						}
					}
				}
			});
		}

		return { succes: true, errorPass: false, relation: videoAsset, errorMsg: '' };
	} catch (exeption) {
		logger.warn(exeption, "Erreur lors de la création de l'asset video");
		return { succes: false, errorPass: !required, relation: null, errorMsg: '' };
	}
}
