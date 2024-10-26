import { writable, type Subscriber } from 'svelte/store';
import { AssetsActions, AssetsCategories } from './enums';
import type { AssetAction, AssetPickerAction, AssetCategory } from './ambiant';

const assetsPanel = writable({ open: false, assetPickerId: '', assetType: '' });

/**
 * @description Subscribe to the assets panel actions Show/Hide (Layout)
 *
 * @example subscribeAssetsPanel((action) => console.log(action))
 *
 * @param callback {Subscriber<AssetPickerAction>}
 * @returns  void
 */
export function subscribeAssetsPanel(callback: Subscriber<AssetPickerAction>) {
	return assetsPanel.subscribe(callback);
}

/**
 * @description Show the assets panel
 *
 * @example showAssets(AssetsCategories.PICTURES, '4e5508fd-979d-47ad-a56b-e9a604d02f1f')
 *
 * @param _assetType {string}
 * @param _assetPickerId {string}
 * @returns void
 */
export function showAssets(_assetType: string, _assetPickerId: string) {
	assetsPanel.set({ open: true, assetPickerId: _assetPickerId, assetType: _assetType });
}

/**
 * @description Hide the assets panel
 *
 * @example hideAssets(AssetsCategories.PICTURES, '4e5508fd-979d-47ad-a56b-e9a604d02f1f')
 *
 * @param _assetType {string}
 * @param _assetPickerId {string}
 * @returns void
 */
export function hideAssets(_assetType: string, _assetPickerId: string = '') {
	assetsPanel.set({ open: false, assetPickerId: _assetPickerId, assetType: _assetType });
}

const assetActionStore = writable<AssetAction>({
	actionName: AssetsActions.DEFAULT,
	assetType: AssetsCategories.DEFAULT,
	asset: null,
	assetPickerId: ''
});

/**
 * @description Subscribe to the assets actions. When an asset is picked, deleted or any other action in the assets panel
 *
 * @example subscribeAssetsAction('4e5508fd-979d-47ad-a56b-e9a604d02f1f', (action) => console.log(action))
 *
 * @param assetPickerId {string}
 * @param callback {Subscriber<AssetAction>}
 * @returns void
 */
export function subscribeAssetsAction(assetPickerId: string, callback: Subscriber<AssetAction>) {
	return assetActionStore.subscribe((assetAction) => {
		callback(assetAction);
	});
}

/**
 * @description Trigger an asset action in the assets panel (Picked, Deleted, etc) Used mainly in the AssetsLibrary
 *
 * @example triggerAssetAction(AssetsCategories.PICTURES, AssetsActions.PICKED, asset, '4e5508fd-979d-47ad-a56b-e9a604d02f1f')
 *
 * @param assetType {string}
 * @param actionName {string}
 * @param asset {AssetCategory}
 * @param assetPickerId {string}
 * @returns void
 */
export function triggerAssetAction(
	assetType: string,
	actionName: string,
	asset: AssetCategory,
	assetPickerId: string
) {
	assetActionStore.set({ assetType, actionName, asset, assetPickerId });
}
