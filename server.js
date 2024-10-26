import express from 'express';
import { createServer } from 'http';
import { handler } from './build-node/handler.js';
import { log } from 'console';
import dotenv from 'dotenv';
import path from 'path';
import middlewares from './modules/server/middlewares/index.js';
import { saveLogs } from './modules/server/tasks/index.js';

dotenv.config();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const { PORT, PUBLIC_UPLOADS_FOLDER_NAME } = process.env;

const port = PORT | 3000;
const app = express();
const server = createServer(app);

middlewares(app, __dirname);

app.use(`/${PUBLIC_UPLOADS_FOLDER_NAME}`, express.static(PUBLIC_UPLOADS_FOLDER_NAME));
app.use(handler);

saveLogs();

server.listen(port, () => {
	log('listening on port', port);
});
