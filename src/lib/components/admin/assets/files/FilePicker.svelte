<script lang="ts">
	import { AssetsActions, AssetsCategories } from '$lib/client/assets/enums';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import { showAssets, subscribeAssetsAction } from '$lib/client/assets/stores';
	import type { FileAsset } from '@prisma/client';
	import { v4 as uuid } from 'uuid';
	import type { Asset } from '@prisma/client';
	import Icon from '@iconify/svelte';
	import { IsCompressedExtension } from '$lib/client/utils/type';

	let galeryAsset: Asset | null = null;
	export let savedAsset: FileAsset | null = null;
	export let assetName = 'File';
	export let identifier: string = '0';

	const assetPickerId = uuid();
	let name = '';

	export function deleteAssetRelation() {
		galeryAsset = null;
		savedAsset = null;
	}

	export function loadAssetRelation(_savedAsset: FileAsset | null) {
		deleteAssetRelation();
		savedAsset = _savedAsset;
		name = savedAsset?.name ?? '';
	}

	subscribeAssetsAction(assetPickerId, (event) => {
		const { actionName } = event;

		switch (actionName) {
			case AssetsActions.PICKED:
				if (event.assetPickerId == assetPickerId && event.asset != null)
					galeryAsset = event.asset as Asset;
				break;

			case AssetsActions.DELETE:
				if (event.asset) {
					const id = event.asset.id;
					if (id == galeryAsset?.id || id == savedAsset?.assetId) {
						deleteAssetRelation();
					}
				}
				break;
		}
	});
</script>

<div class=" mb-4">
	<div class="rounded-container-token">
		<div class="flex">
			<div class="basis-1/3 flex flex-col">
				<span class="ml-3 font-medium">{assetName}</span>
				<input
					class="input h-full"
					type="button"
					value={'Choisir un fichier dans la galerie'}
					on:click={() => {
						showAssets(AssetsCategories.FILE, assetPickerId);
					}}
				/>

				<input
					type="hidden"
					name="fp_id_{identifier}"
					value={galeryAsset?.id ?? savedAsset?.assetId}
				/>
			</div>
			<div class="basis-2/3 pl-4 flex flex-col">
				<span class="ml-3 font-medium">Nom</span>
				<input type="text" class="input h-full" bind:value={name} name="fp_name_{identifier}" />
			</div>
		</div>
		<div>
			{#if galeryAsset != null || savedAsset != null}
				<div
					class="h-36 group/asset mt-4 relative border-solid border-surface-50 dark:border-surface-900 border rounded-container-token"
				>
					<ButtonDelete
						class="absolute top-4 right-4 z-10 transition-all group-hover/asset:opacity-100 opacity-0"
						id="btn-relation"
						click={() => {
							deleteAssetRelation();
						}}
					/>

					<a
						class="h-full block group-hover/asset:opacity-75"
						target="_blank"
						href={galeryAsset?.path ?? savedAsset?.path}
					>
						<div class="h-full z-10 flex flex-col justify-center items-center">
							<Icon
								icon={IsCompressedExtension(galeryAsset?.originalFilename ?? savedAsset?.name ?? '')
									? 'solar:zip-file-bold'
									: 'solar:file-bold'}
								width="32"
								height="32"
							/>
							<span class="font-semibold">{galeryAsset?.originalFilename ?? savedAsset?.name}</span>
						</div>
					</a>
				</div>
			{/if}
		</div>
	</div>
</div>
