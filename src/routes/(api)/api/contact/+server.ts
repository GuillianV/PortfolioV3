import type { RequestHandler } from './$types';
import { IsEmptyString } from '$lib/client/utils/type';
import { prisma } from '$lib/server/prisma';
import { getParametre } from '$lib/server/parametres/parametres';
import { logger } from '$lib/server/logs';
import Mailer from '$lib/server/mail';

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
	try {
		const formData = await request.formData();
		const { nom, prenom, email, telephone, message, token } = Object.fromEntries(formData);

		const ParamReCapchaSecret = await getParametre('SECRET_RECAPCHA_SITEKEY');

		if (!ParamReCapchaSecret.success) {
			logger.error({}, 'La clé recapcha est invalide', '/api/contact');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: 'La clé recapcha est invalide !' }),
				{ status: 400 }
			);
		}

		if (IsEmptyString(token)) {
			logger.warn({}, 'Le token recapcha ne doit pas être vide', '/api/contact');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: 'Le token recapcha ne doit pas être vide' }),
				{ status: 400 }
			);
		}

		if (IsEmptyString(nom)) {
			logger.warn({}, 'Le nom ne doit pas être vide', '/api/contact');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: 'Le nom ne doit pas être vide' }),
				{ status: 400 }
			);
		}

		if (IsEmptyString(prenom)) {
			logger.warn({}, 'Le prenom ne doit pas être vide', '/api/contact');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: 'Le prenom ne doit pas être vide' }),
				{ status: 400 }
			);
		}

		if (IsEmptyString(email)) {
			logger.warn({}, "L'email ne doit pas être vide", '/api/contact');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: "L'email ne doit pas être vide" }),
				{ status: 400 }
			);
		}

		if (IsEmptyString(telephone)) {
			logger.warn({}, 'Le telephone ne doit pas être vide', '/api/contact');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: 'Le telephone ne doit pas être vide' }),
				{ status: 400 }
			);
		}

		if (IsEmptyString(message)) {
			logger.warn({}, 'Le message ne doit pas être vide', '/api/contact');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: 'Le message ne doit pas être vide' }),
				{ status: 400 }
			);
		}

		const url = `https://www.google.com/recaptcha/api/siteverify?secret=${ParamReCapchaSecret.value}&response=${token}`;

		const recapchaPostResponse = await fetch(url, { method: 'post' });
		const recacpchaResponse = await recapchaPostResponse.json();

		if (!recacpchaResponse.success) {
			logger.warn(recacpchaResponse, 'Erreur recapcha', '/api/contact');
			return new Response(JSON.stringify({ type: 'failure', errorMsg: 'Erreur recapcha' }), {
				status: 400
			});
		}

		await prisma.contact.create({
			data: {
				nom: nom as string,
				prenom: prenom as string,
				email: email as string,
				telephone: telephone as string,
				message: message as string
			}
		});

		const mailer = new Mailer();
		await mailer.init();
		mailer.sendMail(
			email as string,
			'Request from cms',
			'Demande de contact reçu',
			'Demande de contact reçu'
		);

		logger.info({}, 'Formulaire de contact envoyé', '/api/contact');
		return new Response(JSON.stringify({ type: 'success', message: 'Formulaire envoye !' }), {
			status: 200
		});
	} catch (error) {
		logger.error(error, '/api/contact');
		return new Response(
			JSON.stringify({
				type: 'error',
				errorMsg: error instanceof Error ? error.message : 'Erreur survenue'
			}),
			{ status: 500 }
		);
	}
};
