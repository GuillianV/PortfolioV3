import { prisma } from '$lib/server/prisma';
import { IsEmptyString } from '$lib/client/utils/type.js';
import type { ParmetreReponse } from '$lib/client/utils/ambiant';

/**
 * @param {string} key
 *
 * @example getParametre('KEY')
 * @returns {Promise<ParmetreReponse>}
 */

const getParametre = async (key: string): Promise<ParmetreReponse> => {
	if (IsEmptyString(key)) {
		return {
			success: false,
			key,
			value: ''
		};
	}

	const parametre = await prisma.parametre.findUnique({
		where: {
			key
		}
	});

	if (parametre == null) {
		return {
			success: false,
			key,
			value: ''
		};
	} else {
		return {
			success: true,
			key: parametre.key,
			value: parametre.value ?? ''
		};
	}
};

export { getParametre };
