<script lang="ts">
	import { AssetsActions, AssetsCategories } from '$lib/client/assets/enums';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import { showAssets, subscribeAssetsAction } from '$lib/client/assets/stores';
	import type { VideoAsset } from '@prisma/client';
	import { v4 as uuid } from 'uuid';
	import type { Asset } from '@prisma/client';

	let galeryAsset: Asset | null = null;
	export let savedAsset: VideoAsset | null = null;
	export let assetName = 'Video';
	export let identifier: string = '0';

	const assetPickerId = uuid();

	let controls: boolean = false;
	let loop: boolean = false;
	let autoplay: boolean = false;

	export function deleteAssetRelation() {
		galeryAsset = null;
		savedAsset = null;
	}

	export function loadAssetRelation(_savedAsset: VideoAsset | null) {
		deleteAssetRelation();
		savedAsset = _savedAsset;
		controls = savedAsset?.controls ?? false;
		loop = savedAsset?.loop ?? false;
		autoplay = savedAsset?.autoplay ?? false;
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
					value={'Choisir une video dans la galerie'}
					on:click={() => {
						showAssets(AssetsCategories.VIDEO, assetPickerId);
					}}
				/>

				<input
					type="hidden"
					name="vp_id_{identifier}"
					value={galeryAsset?.id ?? savedAsset?.assetId}
				/>
			</div>
			<div class="basis-[22.2%] pl-4 flex flex-col">
				<span class="ml-3 font-medium">Controls</span>
				<div class="h-full">
					<input
						type="checkbox"
						class="input h-full"
						bind:checked={controls}
						name="vp_controls_{identifier}"
					/>
				</div>
			</div>
			<div class="basis-[22.2%] pl-4 flex flex-col">
				<span class="ml-3 font-medium">Loop</span>
				<div class="h-full">
					<input
						type="checkbox"
						class="input h-full"
						bind:checked={loop}
						name="vp_loop_{identifier}"
					/>
				</div>
			</div>
			<div class="basis-[22.2%] pl-4 flex flex-col">
				<span class="ml-3 font-medium">Autoplay</span>
				<div class="h-full">
					<input
						type="checkbox"
						class="input h-full"
						bind:checked={autoplay}
						name="vp_autoplay_{identifier}"
					/>
				</div>
			</div>
		</div>
		<div>
			{#if galeryAsset != null || savedAsset != null}
				<div
					class="overflow-hidden group/asset mt-4 relative border-solid border-surface-50 dark:border-surface-900 border rounded-container-token"
				>
					<ButtonDelete
						class="absolute top-4 right-4 z-10 transition-all group-hover/asset:opacity-100 opacity-0"
						id="btn-relation"
						click={() => {
							deleteAssetRelation();
						}}
					/>

					<video
						class="h-full w-full group-hover/asset:opacity-75"
						muted
						loop={savedAsset?.loop ?? false}
						autoplay={savedAsset?.autoplay ?? false}
						controls
					>
						<source src={galeryAsset?.path ?? savedAsset?.path} type="video/mp4" />
						Your browser does not support the video tag.
						<track kind={assetName} />
					</video>
				</div>
			{/if}
		</div>
	</div>
</div>
