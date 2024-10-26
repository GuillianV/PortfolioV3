import { logger } from '$lib/server/logs';
import { AnalyticsRunReport } from '$lib/server/googleapis/analytics';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, locals }): Promise<Response> => {
	try {
		if (!locals.user) {
			logger.warn(request.headers, "Vous n'etes pas connecté", '/api/googleapis/analytics/report');
			return new Response(JSON.stringify({ success: 0, errorMsg: "Vous n'etes pas connecté" }), {
				status: 403
			});
		}

		const result = await AnalyticsRunReport();
		if (!result) {
			logger.warn({}, 'Analytics non active', '/api/googleapis/analytics/report');
			return new Response(JSON.stringify({ type: 'failure', errorMsg: 'Analytics non actif' }), {
				status: 400
			});
		}

		return new Response(JSON.stringify({ type: 'success', data: result }), {
			status: 200
		});
	} catch (error) {
		logger.error(error, '/api/googleapis/analytics/report');
		return new Response(
			JSON.stringify({
				type: 'error',
				errorMsg: error instanceof Error ? error.message : 'Erreur survenue'
			}),
			{ status: 500 }
		);
	}
};
