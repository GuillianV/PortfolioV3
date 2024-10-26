import type { RequestHandler } from './$types';
import { logger } from '$lib/server/logs';
import { saveIndependantAssetUpload } from '$lib/server/assets/asset-upload';
import { resolutionFullHd } from '$lib/client/assets/pictures/resolution';
import { quality80 } from '$lib/client/assets/pictures/quality';

export const POST: RequestHandler = async ({ request, locals }): Promise<Response> => {
	if (!locals.user) {
		logger.error(request.headers, "Vous n'etes pas connecté", '/api/editorjs');
		return new Response(JSON.stringify({ success: 0, errorMsg: "Vous n'etes pas connecté" }), {
			status: 403
		});
	}

	const data = Object.fromEntries(await request.formData());
	const { image } = data;

	const asset = await saveIndependantAssetUpload(image, 'editorjs', resolutionFullHd, quality80);
	if (asset.succes) {
		return new Response(
			JSON.stringify({
				success: 1,
				file: {
					url: asset.assetPath
				}
			})
		);
	}
	logger.error(asset.errorMsg, '/api/editorjs');
	return new Response(
		JSON.stringify({
			success: 0,
			errorMsg: "Une erreur est survenue lors de l'enregistrement de l'image"
		}),
		{ status: 400 }
	);
};
