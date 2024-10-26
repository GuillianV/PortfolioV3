import nodemailer, { type Transporter } from 'nodemailer';
import { getParametre } from '../parametres/parametres';
import { logger } from '$lib/server/logs';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class Mailer {
	isInit: boolean;
	transporter: Transporter | null;
	sender: string;
	senderName: string;
	constructor() {
		this.isInit = false;
		this.transporter = null;
		this.sender = '';
		this.senderName = '';
	}

	/**
	 * @description Initialize the SMTP connection
	 * @returns {Promise<void>}
	 * @example await mailer.init()
	 */
	async init() {
		try {
			const PUBLIC_SMTP_HOST = await getParametre('PUBLIC_SMTP_HOST');
			const PUBLIC_SMTP_PORT = await getParametre('PUBLIC_SMTP_PORT');
			const PUBLIC_SMTP_IDENTIFIANT = await getParametre('PUBLIC_SMTP_IDENTIFIANT');
			const SECRET_SMTP_PASSWORD = await getParametre('SECRET_SMTP_PASSWORD');
			const PUBLIC_SMTP_SENDER = await getParametre('PUBLIC_SMTP_SENDER');
			const PUBLIC_SMTP_SENDER_NAME = await getParametre('PUBLIC_SMTP_SENDER_NAME');

			if (
				!PUBLIC_SMTP_HOST ||
				!PUBLIC_SMTP_PORT ||
				!PUBLIC_SMTP_IDENTIFIANT ||
				!SECRET_SMTP_PASSWORD ||
				!PUBLIC_SMTP_SENDER ||
				!PUBLIC_SMTP_SENDER_NAME
			) {
				logger.error(
					{},
					'Erreur lors de la récupération des paramètres de configuration du serveur SMTP'
				);
			}

			if (
				PUBLIC_SMTP_HOST.value.length <= 0 ||
				PUBLIC_SMTP_PORT.value.length <= 0 ||
				PUBLIC_SMTP_IDENTIFIANT.value.length <= 0 ||
				SECRET_SMTP_PASSWORD.value.length <= 0 ||
				PUBLIC_SMTP_SENDER.value.length <= 0 ||
				PUBLIC_SMTP_SENDER_NAME.value.length <= 0
			) {
				logger.warn(
					{},
					'Erreur lors de la récupération des paramètres de configuration du serveur SMTP'
				);
			}
			this.sender = PUBLIC_SMTP_SENDER.value;
			this.senderName = PUBLIC_SMTP_SENDER_NAME.value;

			const smtpOption = new SMTPTransport({
				host: PUBLIC_SMTP_HOST.value,
				port: parseInt(PUBLIC_SMTP_PORT.value),
				secure: false,
				auth: {
					user: PUBLIC_SMTP_IDENTIFIANT.value,
					pass: SECRET_SMTP_PASSWORD.value
				}
			});

			this.transporter = nodemailer.createTransport(smtpOption);
			this.isInit = true;
		} catch (e) {
			logger.error(e, "Erreur lors de l'initialisation du serveur SMTP");
		}
	}

	/**
	 * @description Send an email
	 * @param to {string}
	 * @param subject {string}
	 * @param text {string}
	 * @param html {string}
	 * @returns {Promise<boolean>}
	 * @example await mailer.sendMail('to@todo.com', 'Subject', 'Text', '<h1>HTML</h1>')
	 **/
	async sendMail(to: string, subject: string, text: string, html: string): Promise<boolean> {
		if (!this.isInit) {
			console.error('Please initialize SMTP connection');
			return false;
		}
		try {
			await this.transporter?.sendMail({
				from: `"${this.senderName}" <${this.sender}>`, // sender address
				to,
				subject,
				text,
				html
			});
		} catch (err) {
			logger.error(err, "Erreur lors de l'envoi du mail");
			return false;
		}

		return true;
	}
}

export default Mailer;
