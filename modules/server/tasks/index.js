import { scheduleJob } from 'node-schedule';
import { copyFileSync, truncateSync } from 'fs';
import { logger } from '../logs/index.js';

/**
 * @description Sauvegarde des logs à la fin de la journée
 * @param {string} rule
 *
 * @returns {void}
 *
 * @example saveLogs('30 0 0 * * *')
 */

export const saveLogs = (rule = '30 0 0 * * *') => {
	scheduleJob(rule, function () {
		try {
			const today = new Date();
			const yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);
			logger.info(`End of the day logs -> ${yesterday.getTime()}.log`);
			copyFileSync('logs/app.log', `logs/old/${yesterday.getTime()}.log`);
			truncateSync('logs/app.log', 0);
			logger.info(`Logs saved !`);
			logger.info(`Begin of the day logs -> ${today.getTime()}.log`);
		} catch (err) {
			logger.error(err);
		}
	});
};
