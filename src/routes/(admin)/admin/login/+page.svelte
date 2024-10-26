<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import Spinner from '$lib/components/admin/Spinner.svelte';
	import type { SvelteComponent } from 'svelte';

	let errorMsg: string | null = null;
	let spinner: SvelteComponent | null = null;
</script>

<div class="flex items-center justify-center h-full w-full">
	<Spinner bind:this={spinner}></Spinner>
	<section
		class="container dark:bg-surface-700 bg-surface-50 rounded-container-token w-full md:w-1/2 lg:w-1/3 p-0 md:p-8"
	>
		<div class="rounded-container-token border-2 m-4 border-secondary-500 w-fit">
			<LightSwitch />
		</div>

		<form
			class="flex flex-col h-full items-center w-full justify-center"
			method="POST"
			action="?/login"
			use:enhance={async ({ formData, cancel }) => {
				const { email, password } = Object.fromEntries(formData);

				if (email == null || typeof email !== 'string' || email.length < 1) {
					errorMsg = 'Email invalide';
					cancel();
					return;
				}

				if (password == null || typeof password !== 'string' || password.length < 1) {
					errorMsg = 'Mot de passe invalide';
					cancel();
					return;
				}

				errorMsg = null;
				spinner?.toggle(true);

				return async ({ result, update }) => {
					switch (result.type) {
						case 'success':
							goto('/admin/home', { invalidateAll: true });
							break;
						case 'failure':
							errorMsg = 'Erreur inconnue';
							if (result.data && typeof result.data.errorMsg === 'string') {
								errorMsg = result.data.errorMsg;
							}
							break;
						case 'error':
							errorMsg = 'Erreur inconnue';
							break;
						default:
							break;
					}

					await update();
					spinner?.toggle(false);
				};
			}}
		>
			<h1 class="h1 text-8xl dark:text-surface-200 text-center text-black m-8">Login</h1>

			<div class="form-group flex flex-col items-start w-full p-4">
				<label class="font-semibold w-8/12 ml-3" for="email">Email</label>

				<div class="flex flex-row items-center w-full">
					<div
						class="w-1/6 shadow-ms bg-surface-300 dark:text-surface-300 flex items-center h-10 rounded-tl-3xl rounded-bl-3xl justify-center border-r-2"
					>
						<Icon class="text-secondary-500 " icon="solar:shield-user-bold" />
					</div>

					<input
						class=" shadow-ms w-5/6 rounded-tr-3xl dark:text-surface-900 rounded-br-3xl border-0 bg-surface-300 focus:border-primary-500 focus:caret-primary-500 placeholder:text-surface-700"
						placeholder="Email"
						id="email"
						name="email"
						type="text"
					/>
				</div>
			</div>

			<div class="form-group flex flex-col items-start w-full p-4">
				<label class="font-semibold w-8/12 ml-3" for="password">Password</label>

				<div class=" flex flex-row items-center w-full">
					<div
						class="shadow-ms w-1/6 bg-surface-300 flex items-center h-10 rounded-tl-3xl rounded-bl-3xl justify-center border-r-2"
					>
						<Icon class="text-secondary-500 " icon="solar:lock-password-bold" />
					</div>

					<input
						class=" shadow-sm w-5/6 rounded-tr-3xl rounded-br-3xl border-0 bg-surface-300 focus:border-primary-500 dark:text-surface-900 focus:caret-primary-500 placeholder:text-surface-700"
						placeholder="Pass"
						id="password"
						name="password"
						type="password"
					/>
				</div>
			</div>

			{#if errorMsg != null}
				<div class="msgError text-error-500">{errorMsg}</div>
			{/if}

			<button
				type="submit"
				value="login"
				class="m-4 p-2 pl-4 pr-4 btn variant-filled-primary shadow-ms">Connexion</button
			>
		</form>
	</section>
</div>
