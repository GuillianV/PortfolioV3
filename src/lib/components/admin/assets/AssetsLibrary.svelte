<script lang="ts">
	import { enhance } from '$app/forms';
	import ButtonQuit from '$lib/components/admin/buttons/quit/ButtonQuit.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import ButtonSelect from '$lib/components/admin/buttons/select/ButtonSelect.svelte';
	import ButtonRefresh from '$lib/components/admin/buttons/refresh/ButtonRefresh.svelte';
	import { hideAssets, triggerAssetAction } from '$lib/client/assets/stores';
	import { showSpinner, hideSpinner } from '$lib/client/spinner';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import { AssetsActions, AssetsCategories } from '$lib/client/assets/enums';

	import {
		ENREGISTREMENT_ERROR,
		ENREGISTREMENT_FAILED,
		ENREGISTREMENT_SUCCES,
		ERROR,
		FAILED,
		SUPRESSION_ERROR,
		SUPRESSION_FAILED,
		SUPRESSION_SUCCES
	} from '$lib/client/toasts/toasts';
	import Icon from '@iconify/svelte';
	import { IsCompressedExtension } from '$lib/client/utils/type';
	import type { AssetPickerAction, AssetCategory } from '$lib/client/assets/ambiant';

	const toastStore = getToastStore();

	let refreshButton: HTMLButtonElement | null = null;
	let assetsContainer: HTMLDivElement | null = null;
	let assetImportInput: HTMLInputElement | null = null;
	let assets: AssetCategory[] = [];
	let tempAssetPickerId = '';
	let assetsLibraryCurrentType = AssetsCategories.FILE;
	let assetsLibraryCategoryName = '';

	export function toggle(value: AssetPickerAction) {
		tempAssetPickerId = value.assetPickerId;
		assetsLibraryCurrentType = value.assetType;
		if (value.open) onOpen();
		else onClose();
	}

	function onOpen() {
		if (!assetsContainer) return;
		assetsContainer.style.display = 'flex';

		switch (assetsLibraryCurrentType) {
			case AssetsCategories.VIDEO:
				assetsLibraryCategoryName = 'video';
				assetImportInput?.setAttribute('accept', 'video/*');
				break;
			case AssetsCategories.PICTURE:
				assetsLibraryCategoryName = 'image';
				assetImportInput?.setAttribute('accept', 'image/*');
				break;
			default:
				assetsLibraryCategoryName = 'fichier';
				assetImportInput?.setAttribute('accept', '*');
				break;
		}

		refreshButton?.click();
	}

	function onClose() {
		if (!assetsContainer) return;
		assetsContainer.style.display = 'none';
	}

	const submitFindall = async ({ formData }: { formData: FormData }) => {
		formData.append('category', assetsLibraryCurrentType);

		showSpinner();
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			hideSpinner();
			switch (result.type) {
				case 'success':
					assets = result.data?.data;
					await update();
					break;
				case 'failure':
					toastStore.trigger(FAILED.addMessage(result.data?.errorMsg).toToast());
					break;
				case 'error':
					toastStore.trigger(
						ERROR.addMessage(
							`Erreur lors de la récuperation des ${assetsLibraryCategoryName}s`
						).toToast()
					);

					break;
				default:
					break;
			}
		};
	};

	const submitCreate = async () => {
		showSpinner();
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			hideSpinner();
			switch (result.type) {
				case 'success':
					toastStore.trigger(ENREGISTREMENT_SUCCES.toToast());

					if (typeof result.data !== 'undefined') {
						assets = [...result.data.data, ...assets];
						await update();
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
		};
	};

	const submitDelete = async ({ formData, cancel }: { formData: FormData; cancel: () => void }) => {
		const { id } = Object.fromEntries(formData);
		let assetToDelete = assets.filter((asset) => asset.id === (id as string));
		if (assetToDelete.length > 0)
			triggerAssetAction(
				assetsLibraryCurrentType,
				AssetsActions.DELETE,
				assetToDelete[0],
				tempAssetPickerId
			);
		else {
			toastStore.trigger(
				SUPRESSION_ERROR.addMessage("La photo sélectionné n'existe pas").toToast()
			);
			cancel();
			return;
		}

		showSpinner();
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			hideSpinner();
			switch (result.type) {
				case 'success':
					toastStore.trigger(SUPRESSION_SUCCES.toToast());

					assets = assets.filter((asset) => asset.id !== result.data?.data);

					await update();
					break;
				case 'failure':
					toastStore.trigger(SUPRESSION_FAILED.addMessage(result.data?.errorMsg).toToast());

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

<div
	bind:this={assetsContainer}
	class="hidden justify-center items-center absolute left-0 top-0 w-full h-full z-40 p-4 backdrop-blur-lg backdrop-brightness-75"
	{...$$restProps}
>
	<form
		method="POST"
		action="/admin/assets?/findall"
		id="findall"
		class="hidden"
		enctype="multipart/form-data"
		use:enhance={submitFindall}
	>
		<button bind:this={refreshButton} class="hidden" type="submit" form="findall" value="Refresh"
		></button>
	</form>

	<div class="w-full h-full z-10 rounded-container-token p-4 relative">
		<ButtonQuit
			class="absolute top-0 right-0"
			click={() => {
				hideAssets(assetsLibraryCurrentType);
			}}
		/>

		<div class="flex flex-row flex-wrap p-4 h-full">
			<div class="w-full max-h-full p-4 h-full flex flex-col">
				<div class="w-full h-auto">
					<div class="rounded-container-token shadow-md p-4 mb-4 flex flex-row justify-between">
						<h2 class="h2">Sélectionner : {assetsLibraryCategoryName}s</h2>
						<ButtonRefresh class="" type="submit" value="Refresh" form="findall"></ButtonRefresh>
					</div>
				</div>

				<div
					class="h-full w-full rounded-container-token shadow-md overflow-hidden overflow-y-auto flex flex-col justify-start p-4"
				>
					<div class="flex flex-wrap justify-center">
						{#if assets != null && assets.length > 0}
							{#each assets as asset, index}
								<div
									class="group rounded-lg lg:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-full h-96 pr-4 pb-4 relative"
								>
									{#if asset.assetCategory.name == AssetsCategories.PICTURE}
										<img
											class="rounded-lg w-full h-full object-cover"
											loading="lazy"
											src="{asset.path}?width=300&height=300"
											alt={asset.originalFilename}
										/>
									{:else if asset.assetCategory.name == AssetsCategories.VIDEO}
										<video class="rounded-lg w-full h-full object-cover" controls src={asset.path}>
											<track kind="captions" /></video
										>
									{:else}
										<div
											class="z-0 rounded-lg flex justify-center items-center w-full h-full relative overflow-hidden"
										>
											<span
												class="z-0 bg-surface-50 dark:bg-surface-800 absolute left-0 top-0 w-full h-full opacity-50"
											></span>
											<div class="z-10 flex flex-col justify-center items-center">
												<Icon
													icon={IsCompressedExtension(asset.originalFilename)
														? 'solar:zip-file-bold'
														: 'solar:file-bold'}
													width="32"
													height="32"
												/>
												<span class="font-semibold">{asset.originalFilename}</span>
											</div>
										</div>
									{/if}
									<ButtonDelete
										class="!hidden group-hover:!flex absolute top-4 right-4"
										type="submit"
										value="delete-{index}"
										form="delete-{index}"
									/>

									<div class="hidden">
										<form
											action="/admin/assets?/delete"
											method="POST"
											id="delete-{index}"
											use:enhance={submitDelete}
										>
											<input type="hidden" name="id" value={asset.id} />
										</form>
									</div>

									<ButtonSelect
										click={() => {
											triggerAssetAction(
												assetsLibraryCurrentType,
												AssetsActions.PICKED,
												asset,
												tempAssetPickerId
											);
											hideAssets(assetsLibraryCurrentType);
										}}
										class="!hidden group-hover:!flex absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2"
									/>
								</div>
							{/each}
						{/if}
					</div>
				</div>

				<div class="w-full">
					<div
						class="flex flex-col justify-center items-center w-full h-full rounded-container-token shadow-md p-4"
					>
						<div class="h-full flex justify-center items-end w-full">
							<form
								method="POST"
								action="/admin/assets?/create"
								id="create"
								class=" w-full"
								enctype="multipart/form-data"
								use:enhance={submitCreate}
							>
								<label class="label mb-4" for="file">
									<span class="ml-3 font-semibold">Importer des {assetsLibraryCategoryName}s</span>
									<input
										bind:this={assetImportInput}
										multiple
										class="input"
										type="file"
										id="file"
										name="assetsFiles"
									/>
								</label>

								<ButtonSave titre="Importer" type="submit" value="Creer" form="create" />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
