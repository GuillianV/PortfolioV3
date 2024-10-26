<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { IsEmptyString } from '$lib/client/utils/type.js';
	import Writer from '$lib/components/editor/Writer.svelte';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { hideSpinner, showSpinner } from '$lib/client/spinner/index.js';
	import { onMount } from 'svelte';
	import PicturePicker from '$lib/components/admin/assets/pictures/PicturePicker.svelte';
	import {
		ENREGISTREMENT_ERROR,
		ENREGISTREMENT_FAILED,
		ENREGISTREMENT_SUCCES,
		FAILED,
		SUPRESSION_ERROR,
		SUPRESSION_FAILED,
		SUPRESSION_SUCCES
	} from '$lib/client/toasts/toasts.js';
	import FilePicker from '$lib/components/admin/assets/files/FilePicker.svelte';
	import VideoPicker from '$lib/components/admin/assets/videos/VideoPicker.svelte';
	import Text from '$lib/components/admin/modules/detail/Text.svelte';
	import Number from '$lib/components/admin/modules/detail/Number.svelte';
	import Textarea from '$lib/components/admin/modules/detail/Textarea.svelte';

	const toastStore = getToastStore();

	export let data;

	let { actualite, pictureAsset, fileAsset, videoAsset } = data;

	let writer: Writer | null = null;

	let picturePicker: PicturePicker | null = null;
	let filePicker: FilePicker | null = null;
	let videoPicker: VideoPicker | null = null;
	onMount(() => {
		writer?.loadContenu(actualite?.contenu ?? '');
		filePicker?.loadAssetRelation(fileAsset);
		videoPicker?.loadAssetRelation(videoAsset);
		picturePicker?.loadAssetRelation(pictureAsset);
	});

	const submitCreateActualite = async ({
		formData,
		cancel
	}: {
		formData: FormData;
		cancel: () => void;
	}) => {
		const { titre, redacteur, tempsLecture, descriptionCourte } = Object.fromEntries(formData);

		if (IsEmptyString(titre)) {
			toastStore.trigger(FAILED.addMessage('Le titre ne doit pas être vide').toToast());
			cancel();
			return;
		}

		if (IsEmptyString(redacteur)) {
			toastStore.trigger(FAILED.addMessage('Le rédacteur ne doit pas être vide').toToast());
			cancel();
			return;
		}

		if (IsEmptyString(tempsLecture)) {
			toastStore.trigger(FAILED.addMessage('Le temps de lecture ne doit pas être vide').toToast());
			cancel();
			return;
		}

		if (IsEmptyString(descriptionCourte)) {
			toastStore.trigger(FAILED.addMessage('La description ne doit pas être vide').toToast());
			cancel();
			return;
		}

		formData.append('contenu', (await writer?.saveContenu()) ?? '');

		showSpinner();
		return async ({ result }: { result: ActionResult; update: () => Promise<void> }) => {
			hideSpinner();

			switch (result.type) {
				case 'success':
					toastStore.trigger(ENREGISTREMENT_SUCCES.toToast());

					if (typeof result.data !== 'undefined') {
						actualite = result.data.actualite;
						pictureAsset = result.data.pictureAsset;
						fileAsset = result.data.fileAsset;
						videoAsset = result.data.videoAsset;
						videoPicker?.loadAssetRelation(videoAsset);
						filePicker?.loadAssetRelation(fileAsset);
						picturePicker?.loadAssetRelation(pictureAsset);
					}

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

	const submitDeleteActualite = () => {
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					toastStore.trigger(SUPRESSION_SUCCES.toToast());

					break;
				case 'failure':
					toastStore.trigger(SUPRESSION_FAILED.toToast());

					break;

				case 'error':
					toastStore.trigger(SUPRESSION_ERROR.toToast());

					break;
				default:
					break;
			}
			await update();

			goto('/admin/actualites', { invalidateAll: true });
		};
	};
</script>

<Content>
	<svelte:fragment slot="buttons">
		<ButtonSave titre="Enregistrer" type="submit" value="Update" form="upsert" />
		{#if actualite?.id != null}
			<ButtonDelete type="submit" value="Update" form="delete-actualite-{actualite?.id}" />

			<div class="hidden">
				<form
					action="?/delete"
					method="POST"
					id="delete-actualite-{actualite?.id}"
					use:enhance={submitDeleteActualite}
				>
					<input type="hidden" name="id" value={actualite.id} />
				</form>
			</div>
		{/if}
	</svelte:fragment>

	<div class="head w-full bg-surface-50 dark:bg-surface-800 rounded-container-token pl-8 pr-8 p-4">
		<h1 class="h1">
			{actualite?.id == null ? 'Créer' : 'Modifier'} l'Actualité
		</h1>
	</div>

	<div class="mt-4 w-full bg-surface-300 dark:bg-surface-800 rounded-container-token p-8">
		<form
			method="POST"
			action="?/upsert"
			id="upsert"
			class=""
			enctype="multipart/form-data"
			use:enhance={submitCreateActualite}
		>
			<Text name="Titre" identifier="titre" value={actualite?.titre} />
			<PicturePicker bind:this={picturePicker} assetName="Photo Principale" />
			<FilePicker bind:this={filePicker} assetName="Fichier externe" />
			<VideoPicker bind:this={videoPicker} assetName="Video Slider" />
			<Text name="Rédacteur" identifier="redacteur" value={actualite?.redacteur} />
			<Number
				name="Temps de Lecture (en minutes)"
				identifier="tempsLecture"
				value={actualite?.tempsLecture}
			/>
			<Textarea
				name="Description courte"
				identifier="descriptionCourte"
				value={actualite?.descriptionCourte}
				maxlength={200}
			/>

			<label class="label" for="contenu">
				<span class="ml-3 font-semibold">Contenu</span>
				<div class="textarea contenu" id="contenu">
					<Writer bind:this={writer} />
				</div>
			</label>

			<input type="hidden" name="id" value={actualite?.id ?? null} />
		</form>
	</div>
</Content>
