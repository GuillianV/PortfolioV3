<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import {
		ENREGISTREMENT_ERROR,
		ENREGISTREMENT_FAILED,
		ENREGISTREMENT_SUCCES
	} from '$lib/client/toasts/toasts.js';

	const toastStore = getToastStore();
	export let data;
	let { parametres } = data;

	const UpdateParametre = async () => {
		return async ({ result }: { result: ActionResult }) => {
			switch (result.type) {
				case 'success':
					toastStore.trigger(ENREGISTREMENT_SUCCES.toToast());

					break;
				case 'failure':
					toastStore.trigger(ENREGISTREMENT_FAILED.addMessage(result.data?.errorMsg).toToast());

					break;
				case 'error':
					toastStore.trigger(ENREGISTREMENT_ERROR.toToast());

					break;
				default:
					break;
			}
			await applyAction(result);
		};
	};
</script>

<Content>
	<svelte:fragment slot="buttons"></svelte:fragment>

	<div
		class="head w-full bg-surface-50 dark:bg-surface-800 rounded-container-token mb-4 pl-8 pr-8 p-4"
	>
		<h1 class="h1">Liste des paramètres</h1>
	</div>

	<div class="mt-4 w-full bg-surface-300 dark:bg-surface-800 rounded-container-token p-8">
		<div>
			{#each parametres as parametre, index}
				<form
					method="POST"
					action="?/update"
					id="update-{index}"
					class=""
					use:enhance={UpdateParametre}
				>
					<label class="label mb-4" for="value-{index}">
						<span class="ml-3 font-semibold">{parametre.label}</span>
						<div class="flex flex-col md:flex-row">
							<input
								class="input w-full mb-4 md:mb-0"
								id="value-{index}"
								name="value"
								value={parametre.value}
								contenteditable="true"
								type="text"
							/>
							<input type="hidden" name="key" value={parametre.key} />
							<ButtonSave
								class="min-w-48 m-0 md:ml-4"
								titre="Enregistrer"
								type="submit"
								value="update-{index}"
								form="update-{index}"
							/>
						</div>
					</label>
				</form>
			{/each}

			<label class="label mb-4" for="light-dark">
				<span class="ml-3 font-semibold">Theme sombre / lumineux</span>
				<div>
					<div class="rounded-container-token border-2 border-secondary-500 w-fit">
						<LightSwitch />
					</div>
				</div>
			</label>
		</div>
	</div>
</Content>
