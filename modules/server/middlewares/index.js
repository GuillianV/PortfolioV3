import dotenv from 'dotenv';
import path from 'path';
import sharpen from '../sharp/index.js';
import { logger } from '../logs/index.js';
dotenv.config();

/**
 * @description Middlewares pour la gestion des images, fichiers et erreurs
 *
 * @param {Express} app
 * @param {string} dirname
 */

const middlewares = function (app, dirname) {
	app.use(['/uploads', '/images'], (req, res, next) => {
		const imageRegex = /\.(jpg|jpeg|png|bmp|webp|avif|svg)$/i;

		if (imageRegex.test(req.url)) {
			const { width, height } = req.query;
			const fullpath = path
				.join(dirname, req.baseUrl.includes('images') ? 'static' : '', req.baseUrl, req.url)
				.replace('\\', '');
			sharpen({
				fullpath,
				width,
				height,
				callback: (err, data, info, format) => {
					if (err) {
						return next(err);
					}

					res.type(format).send(data);
				}
			});
		} else {
			next();
		}
	});

	const errorHandler = (error, request, response, next) => {
		if (!error) {
			next();
		}

		if (error instanceof Error) {
			logger.warn(error.stack, error.message, request.url);
		}
		const status = error.status || 400;
		response.status(status).send(error.message);
	};

	app.use(errorHandler);
};

export default middlewares;
