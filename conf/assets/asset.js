import { logger } from '../../modules/server/logs';
import { prisma } from '../../modules/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 * Initialisation des catégories d'assets
 * @example initialize()
 *
 * @returns {Promise<void>}
 */

export async function initialize() {
	console.log('Initialisation des assets');
	logger.debug('Initialisation des assets');

	const categories = ['PICTURE', 'VIDEO', 'FILE'];
	categories.forEach(async (categoryName) => {
		try {
			const category = await prisma.assetCategory.create({
				data: {
					name: categoryName
				}
			});

			if (category) logger.debug(`Asset category ${categoryName} cree avec succes`);
			else logger.error(`Asset category ${categoryName} non cree`);
		} catch (err) {
			if (err instanceof PrismaClientKnownRequestError && err.code == 'P2002')
				logger.debug(`Asset category ${categoryName} existant, skipped`);
			else logger.error(err);
		}
	});
}
