import { logger } from '../../modules/server/logs';
import { existsSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

/**
 * //https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries#node.js
 * @description Initialisation des services google
 * @example initialize()
 *
 * @returns {Promise<void>}
 */

export async function initialize() {
	console.log('Initialisation googleapis');
	logger.debug('Initialisation googleapis');

	const { GOOGLE_APPLICATION_CREDENTIALS } = process.env;
	if (GOOGLE_APPLICATION_CREDENTIALS == null) {
		logger.error('Fichier env manquant pour les googleapis');
		process.exit(1);
	}

	console.log(GOOGLE_APPLICATION_CREDENTIALS);
	const isGoogleApis = existsSync(GOOGLE_APPLICATION_CREDENTIALS);
	logger.debug(
		`Fichier de configuration des googleapis ${isGoogleApis ? 'trouvé' : 'introuvable'}`
	);

	process.env.PRIVATE_GOOGLE_APPLICATION_CREDENTIALS_ENABLED = isGoogleApis.toString();
	console.log(process.env.PRIVATE_GOOGLE_APPLICATION_CREDENTIALS_ENABLED);
}
