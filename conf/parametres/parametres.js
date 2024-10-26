import dotenv from 'dotenv';
import ParametresJson from './parametres.config.json';
import { logger } from '../../modules/server/logs';
import { prisma } from '../../modules/server/database';
dotenv.config();

/**
 *
 *
 * @description Initialisation des parametres
 * @example initialize()
 * @returns {void}
 */

export function initialize() {
	try {
		console.log('Initialisation des parametres');
		logger.debug('Initialisation des parametres');

		ParametresJson.forEach(async (_parametre) => {
			const { key, label, default_value, env_key, order } = _parametre;

			const parametreFound = await get(key);

			if (parametreFound != null) {
				logger.debug(`Parametre ${parametreFound.key} deja existant, skipped`);
				return;
			}

			let initialValue = process.env[env_key] ?? default_value;
			const parametreCree = await create(key, label, order, initialValue);

			if (parametreCree == null) {
				throw new Error(`Erreur lors de la création du parametre ${key}`);
			}

			logger.debug(`Parametre ${parametreCree.key} cree avec succes`);
		});
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		process.exit(1);
	}
}

/**
 * @param {string} KEY
 * @param {string} LABEL
 * @param {number} ORDER
 * @param {string} VALUE
 *
 * @example create('KEY','label description','VALUE')
 * @returns {Promise<{ key: string; label: string; order:number; value: string | null; } | null>}
 */

export async function create(KEY, LABEL, ORDER, VALUE) {
	try {
		let data = null;

		if (!KEY) {
			throw new Error('Parametre KEY manquant');
		}

		if (!LABEL) {
			throw new Error('Parametre LABEL manquant');
		}

		if (!ORDER) {
			throw new Error('Parametre ORDER manquant');
		}

		data = await prisma.parametre.create({
			data: {
				key: KEY,
				label: LABEL,
				order: ORDER,
				value: VALUE
			}
		});

		return data;
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		return null;
	}
}

/**
 * @param {string} KEY
 *
 * @example get('KEY')
 * @returns {Promise<{ key: string; label: string; order:number; value: string | null } | null>}
 */

export async function get(KEY) {
	try {
		let data = null;
		if (!KEY) {
			throw new Error('Parametre KEY manquant');
		}

		data = await prisma.parametre.findUnique({
			where: {
				key: KEY
			}
		});
		return data;
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		return null;
	}
}
