import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { IsEmptyString } from '$lib/client/utils/type.js';
import type { Actualite } from '@prisma/client';
import { logger } from '$lib/server/logs';
import { savePictureAsset } from '$lib/server/assets/picture/picture-asset-upload';
import { saveFileAsset } from '$lib/server/assets/file/file-asset-upload';
import { saveVideoAsset } from '$lib/server/assets/video/video-asset-upload';

const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};

export const action_upsert = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/actualite');

		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const {
		id,
		titre,
		redacteur,
		tempsLecture,
		descriptionCourte,
		contenu,
		pp_id_0,
		pp_resolution_0,
		pp_quality_0,
		fp_id_0,
		fp_name_0,
		vp_id_0,
		vp_controls_0,
		vp_autoplay_0,
		vp_loop_0
	} = data;
	if (id != null && id != undefined && typeof id !== 'string') {
		logger.warn({}, "L'Id doit être null ou une chaine de caractère", '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: "❌ L'Id doit être null ou une chaine de caractère"
		});
	}

	if (IsEmptyString(titre)) {
		logger.warn({}, 'Le titre ne doit pas être vide', '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: '❌ Le titre ne doit pas être vide'
		});
	}

	if (IsEmptyString(redacteur)) {
		logger.warn({}, 'Le redacteur ne doit pas être vide', '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: '❌ Le redacteur ne doit pas être vide'
		});
	}

	if (IsEmptyString(tempsLecture)) {
		logger.warn({}, 'Le temps de lecture ne doit pas être vide', '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: '❌ Le temps de lecture ne doit pas être vide'
		});
	}

	if (IsEmptyString(descriptionCourte)) {
		logger.warn({}, 'La description courte ne doit pas être vide', '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: '❌ La description courte ne doit pas être vide'
		});
	}

	if (contenu != null && contenu != undefined && typeof contenu !== 'string') {
		logger.warn({}, 'Le contenu doit être null ou une chaine de caractère', '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: '❌ Le contenu doit être null ou une chaine de caractère'
		});
	}

	try {
		const savePhotoPrincipale = await savePictureAsset(pp_id_0, {
			resolution: pp_resolution_0,
			quality: pp_quality_0,
			required: true
		});

		const saveFichierExterne = await saveFileAsset(fp_id_0, {
			name: fp_name_0,
			required: true
		});

		const saveVideoSlide = await saveVideoAsset(vp_id_0, {
			controls: vp_controls_0,
			autoplay: vp_autoplay_0,
			loop: vp_loop_0,
			required: false
		});

		if (!savePhotoPrincipale.succes && !savePhotoPrincipale.errorPass) {
			logger.warn({}, savePhotoPrincipale.errorMsg, '/admin/actualite');

			return fail(400, {
				data: data,
				errorMsg: savePhotoPrincipale.errorMsg
			});
		}

		if (!saveFichierExterne.succes && !saveFichierExterne.errorPass) {
			logger.warn({}, saveFichierExterne.errorMsg, '/admin/actualite');

			return fail(400, {
				data: data,
				errorMsg: saveFichierExterne.errorMsg
			});
		}

		if (!saveVideoSlide.succes && !saveVideoSlide.errorPass) {
			logger.warn({}, saveVideoSlide.errorMsg, '/admin/actualite');

			return fail(400, {
				data: data,
				errorMsg: saveVideoSlide.errorMsg
			});
		}

		const actualite: Actualite | null = await prisma.actualite.upsert({
			where: {
				id
			},
			create: {
				titre: titre as string,
				redacteur: redacteur as string,
				tempsLecture: tempsLecture as string,
				descriptionCourte: descriptionCourte as string,
				pictureAssetId_Principale: savePhotoPrincipale.relation?.id ?? '',
				fileAssetId_Externe: saveFichierExterne.relation?.id ?? '',
				videoAssetId_Slide: saveVideoSlide.relation?.id ?? '',
				contenu
			},
			update: {
				titre: titre as string,
				redacteur: redacteur as string,
				tempsLecture: tempsLecture as string,
				descriptionCourte: descriptionCourte as string,
				pictureAssetId_Principale: savePhotoPrincipale.relation?.id ?? '',
				fileAssetId_Externe: saveFichierExterne.relation?.id ?? '',
				videoAssetId_Slide: saveVideoSlide.relation?.id ?? '',
				contenu
			}
		});

		return {
			actualite,
			pictureAsset: savePhotoPrincipale.relation,
			fileAsset: saveFichierExterne.relation,
			videoAsset: saveVideoSlide.relation,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/actualite');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue lors de l'enregistrement de l'actualité"
		});
	}
};
export const action_delete = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/actualite');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const { id } = data;

	if (id == null || id == '') {
		logger.warn({}, "L'identifiant de l'actualité est requis", '/admin/actualite');
		return fail(400, {
			data: data,
			errorMsg: "❌ L'identifiant de l'actualité est requis"
		});
	}

	try {
		const actualiteToDelete: Actualite | null = await prisma.actualite.findUnique({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		if (actualiteToDelete == null) {
			logger.warn({}, "L'actualité n'existe pas", '/admin/actualite');
			return fail(400, {
				data: data,
				errorMsg: "L'actualité n'existe pas"
			});
		}

		await prisma.actualite.delete({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		return {
			id,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/actualite');
		return fail(400, {
			data: data,
			errorMsg: "❌ Une erreur est survenue lors de la suppression de l'actualité"
		});
	}
};
