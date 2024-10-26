import dotenv from 'dotenv';
import { logger } from '../../modules/server/logs';
import { initialize } from './auth.js';

dotenv.config();

const { SECRET_ADMIN_EMAIL, SECRET_ADMIN_PASSWORD, NODE_ENV } = process.env;

if (SECRET_ADMIN_EMAIL == null || SECRET_ADMIN_PASSWORD == null || NODE_ENV == null) {
	logger.fatal("Variables d'environement manquantes");
	process.exit(1);
}

export default () => {
	return {
		name: 'run-init-script',
		async buildStart() {
			await initialize(NODE_ENV, SECRET_ADMIN_EMAIL, SECRET_ADMIN_PASSWORD);
		}
	};
};
