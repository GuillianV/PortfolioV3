import type { ToastSettings } from '@skeletonlabs/skeleton';

class ToastSettingsClient {
	toastSettings;

	constructor(_toastSettings: ToastSettings) {
		this.toastSettings = _toastSettings;
	}

	/**
	 * @description Set the message of the toast
	 *
	 * @example ENREGISTREMENT_SUCCES.addMessage('Enregistrement effecté !')
	 *
	 * @param message {string | null}
	 * @returns ToastSettingsClient
	 */
	addMessage(message: string | null) {
		this.toastSettings.message = message ?? '';
		return this;
	}

	/**
	 * @description Set the timeout of the toast
	 *
	 * @example ENREGISTREMENT_SUCCES.addColor('variant-filled-error')
	 *
	 * @param cssClass {string}
	 * @returns ToastSettingsClient
	 */
	addColor(cssClass: string) {
		this.toastSettings.background = cssClass;
		return this;
	}

	/**
	 * @example ENREGISTREMENT_SUCCES.toToast()
	 *
	 * @returns {ToastSettings} The toast settings
	 */
	toToast() {
		return this.toastSettings;
	}
}

export const ENREGISTREMENT_SUCCES: ToastSettingsClient = new ToastSettingsClient({
	timeout: 1000,
	message: 'Enregistrement effecté !',
	background: 'variant-filled-success'
});
export const ENREGISTREMENT_FAILED: ToastSettingsClient = new ToastSettingsClient({
	timeout: 2000,
	message: "Echec de l'enregistrement",
	background: 'variant-filled-error'
});
export const ENREGISTREMENT_ERROR: ToastSettingsClient = new ToastSettingsClient({
	timeout: 2000,
	message: "Echec de l'enregistrement",
	background: 'variant-filled-error'
});

export const SUPRESSION_SUCCES: ToastSettingsClient = new ToastSettingsClient({
	timeout: 1000,
	message: 'Suppression effecté !',
	background: 'variant-filled-success'
});
export const SUPRESSION_FAILED: ToastSettingsClient = new ToastSettingsClient({
	timeout: 2000,
	message: 'Echec de la suppression',
	background: 'variant-filled-error'
});
export const SUPRESSION_ERROR: ToastSettingsClient = new ToastSettingsClient({
	timeout: 2000,
	message: 'Echec de la suppression',
	background: 'variant-filled-error'
});

export const FAILED: ToastSettingsClient = new ToastSettingsClient({
	timeout: 2000,
	message: 'Une erreur est survenue',
	background: 'variant-filled-error'
});
export const ERROR: ToastSettingsClient = new ToastSettingsClient({
	timeout: 2000,
	message: 'Une erreur est survenue',
	background: 'variant-filled-error'
});
