import { writable, type Subscriber } from 'svelte/store';

const spinner = writable(false);

/**
 * @description Subscribe to the Main spinner actions Show/Hide
 *
 * @example subscribeSpinner((action) => console.log(action))
 *
 * @param callback {Subscriber<boolean>}
 * @returns  void
 */
export function subscribeSpinner(callback: Subscriber<boolean>) {
	return spinner.subscribe(callback);
}

/**
 * @description Show the spinner
 *
 * @example showSpinner()
 *
 * @returns void
 */
export function showSpinner() {
	spinner.set(true);
}

/**
 * @description Hide the spinner
 *
 * @example hideSpinner()
 *
 * @returns void
 */
export function hideSpinner() {
	spinner.set(false);
}
