<script lang="ts">
	import { AssetsActions, AssetsCategories } from '$lib/client/assets/enums';
	import qualities, { Quality } from '$lib/client/assets/pictures/quality';
	import resolutions, { Resolution } from '$lib/client/assets/pictures/resolution';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import { showAssets, subscribeAssetsAction } from '$lib/client/assets/stores';
	import type { PictureAsset } from '@prisma/client';
	import { v4 as uuid } from 'uuid';
	import type { Asset } from '@prisma/client';

	let galeryAsset: Asset | null = null;
	export let savedAsset: PictureAsset | null = null;
	export let assetName = 'Photo';
	export let identifier: string = '0';

	const assetPickerId = uuid();
	let resolution = Resolution.fromInput(savedAsset?.resolution);
	let quality = Quality.fromInput(savedAsset?.quality);

	export function deleteAssetRelation() {
		galeryAsset = null;
		savedAsset = null;
	}

	export function loadAssetRelation(_savedAsset: PictureAsset | null) {
		deleteAssetRelation();
		savedAsset = _savedAsset;
		resolution = Resolution.fromInput(savedAsset?.resolution);
		quality = Quality.fromInput(savedAsset?.quality);
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
	<!-- <span class="ml-3 font-semibold">Galerie</span> -->
	<div class="rounded-container-token">
		<div class="flex">
			<div class="basis-1/3 flex flex-col">
				<span class="ml-3 font-medium">{assetName}</span>
				<input
					class="input h-full"
					type="button"
					value={'Choisir une image dans la galerie'}
					on:click={() => {
						showAssets(AssetsCategories.PICTURE, assetPickerId);
					}}
				/>

				<input
					type="hidden"
					name="pp_id_{identifier}"
					value={galeryAsset?.id ?? savedAsset?.assetId}
				/>
			</div>
			<div class="basis-1/3 pl-4 pr-4 flex flex-col">
				<span class="ml-3 font-medium">Qualité</span>
				<select class="input" name="pp_quality_{identifier}" value={quality.value()}>
					{#each qualities as quality}
						<option value={quality.value()}>{quality.key()}</option>
					{/each}
				</select>
			</div>
			<div class="basis-1/3 flex flex-col">
				<span class="ml-3 font-medium">Résolution</span>
				<select class="input" name="pp_resolution_{identifier}" value={resolution.value()}>
					{#each resolutions as resolution}
						<option value={resolution.value()}>{resolution.key()}</option>
					{/each}
				</select>
			</div>
		</div>
		<div>
			{#if galeryAsset != null || savedAsset != null}
				<div
					class="group/asset mt-4 relative border-solid border-surface-50 dark:border-surface-900 border rounded-container-token"
				>
					<ButtonDelete
						class="absolute top-4 right-4 z-10 transition-all group-hover/asset:opacity-100 opacity-0"
						id="btn-relation"
						click={() => {
							deleteAssetRelation();
						}}
					/>

					<img
						class="group-hover/asset:opacity-75 z-0 transition-all card h-80 w-full bg-cover object-cover"
						src={galeryAsset?.path ?? savedAsset?.path}
						alt={assetName}
					/>
				</div>
			{/if}
		</div>
	</div>
</div>
