<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import {
		SUPRESSION_ERROR,
		SUPRESSION_FAILED,
		SUPRESSION_SUCCES
	} from '$lib/client/toasts/toasts.js';

	const toastStore = getToastStore();
	export let data;
	let { contacts } = data;

	const Delete = () => {
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					toastStore.trigger(SUPRESSION_SUCCES.toToast());

					if (result.data != null && result.data.id != null) {
						const id: string = result.data.id;
						contacts = contacts.filter((contacts) => contacts.id != id);
					}
					await update();
					break;
				case 'failure':
					toastStore.trigger(SUPRESSION_FAILED.toToast());
					await update();
					break;
				case 'error':
					toastStore.trigger(SUPRESSION_ERROR.toToast());
					break;
				default:
					break;
			}
		};
	};
</script>

<Content>
	<svelte:fragment slot="buttons"></svelte:fragment>

	<div
		class="head w-full bg-surface-50 dark:bg-surface-800 rounded-container-token mb-4 pl-8 pr-8 p-4"
	>
		<h1 class="h1">Liste des contacts</h1>
	</div>

	<dl class="list-dl">
		{#each contacts as contact, index}
			<div class="w-full block p-2 bg-surface-50 dark:bg-surface-800 rounded-container-token">
				<div class="h-16 w-full !justify-between">
					<a class="flex flex-row" href="/admin/contact/{contact.id}">
						<span class="badge variant-outline-secondary"
							><Icon
								icon="solar:double-alt-arrow-right-bold-duotone"
								class="text-secondary-500"
								width="32"
								height="32"
							></Icon></span
						>
						<span class="pl-4 flex-auto">
							<dt>{contact.nom} {contact.prenom}</dt>
							<dd>{contact.email}</dd>
						</span>
					</a>
					<div>
						<ButtonDelete
							class="!mr-0"
							type="submit"
							value="Delete"
							form="delete-contacts-{index}"
						/>
						<div class="!hidden">
							<form
								action="?/delete"
								method="POST"
								id="delete-contacts-{index}"
								use:enhance={Delete}
							>
								<input type="hidden" name="id" value={contact.id} />
							</form>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</dl>
</Content>
