<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { IsEmptyString } from '$lib/client/utils/type';
	import type { ParmetreReponse } from '$lib/client/utils/ambiant';

	export let PUBLIC_RECAPCHA_SITEKEY: ParmetreReponse;
	let errorMsg: string = '';
</script>

<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPCHA_SITEKEY.value}"
	></script>
</svelte:head>

<form
	method="POST"
	action="/api/contact"
	name="contact"
	id="contact"
	use:enhance={async ({ formData, cancel }) => {
		try {
			const { nom, prenom, email, telephone, message } = Object.fromEntries(formData);

			if (
				IsEmptyString(nom) ||
				IsEmptyString(prenom) ||
				IsEmptyString(email) ||
				IsEmptyString(telephone) ||
				IsEmptyString(message)
			) {
				cancel();
				return;
			}

			await new Promise((resolve) => {
				window.grecaptcha.ready(async () => {
					resolve(true);
				});
			});

			const token = await window.grecaptcha.execute(PUBLIC_RECAPCHA_SITEKEY.value, {
				action: 'contact'
			});
			if (IsEmptyString(token)) {
				cancel();
				return;
			}

			formData.append('token', token);
		} catch (error) {
			console.error(error);
			errorMsg = "Une erreur est survenue lors de l'envoi du formulaire";
			cancel();
			return;
		}

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					await applyAction(result);
					// @ts-expect-error: Should expect message
					errorMsg = result?.message;
					break;
				case 'failure':
					// @ts-expect-error: Should expect error message
					if (typeof result.errorMsg === 'string')
						// @ts-expect-error: Should expect error message
						errorMsg = result.errorMsg;
					break;
				case 'error':
					errorMsg = 'Une erreur serveur est survenue';
					break;
				default:
					break;
			}
		};
	}}
>
	<label class="label" for="nom">
		<span class="ml-3 font-semibold">Nom</span>
		<input class="input" name="nom" contenteditable="true" type="text" required />
	</label>

	<label class="label" for="prenom">
		<span class="ml-3 font-semibold">Prenom</span>
		<input class="input" name="prenom" contenteditable="true" type="text" required />
	</label>

	<label class="label" for="email">
		<span class="ml-3 font-semibold">E-mail</span>
		<input class="input" name="email" contenteditable="true" type="email" required />
	</label>

	<label class="label" for="telephone">
		<span class="ml-3 font-semibold">Téléphone</span>
		<input class="input" name="telephone" type="tel" required />
	</label>

	<label class="label" for="message">
		<span class="ml-3 font-semibold">Message</span>
		<input class="input" name="message" type="text" required />
	</label>

	<div class="error" aria-live="polite">
		{#if errorMsg && errorMsg.length > 0}
			<p>{errorMsg}</p>
		{/if}
	</div>

	<label class="label" for="envoyer">
		<button type="submit">Envoyer</button>
	</label>
</form>
