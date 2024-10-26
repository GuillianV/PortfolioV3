<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { initializeStores, Toast, Drawer } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/admin/sidebar/Sidebar.svelte';
	import Spinner from '$lib/components/admin/Spinner.svelte';
	import Assets from '$lib/components/admin/assets/AssetsLibrary.svelte';
	import { subscribeSpinner } from '$lib/client/spinner/index.js';
	import { subscribeAssetsPanel } from '$lib/client/assets/stores';
	import type { SvelteComponent } from 'svelte';
	import type { AssetPickerAction } from '$lib/client/assets/ambiant.js';

	function setInitialClassState() {
		const elemHtmlClasses = document.documentElement.classList;
		// Conditions
		const condLocalStorageUserPrefs = localStorage.getItem('modeUserPrefers') === 'false';
		const condLocalStorageUserPrefsExists = !('modeUserPrefers' in localStorage);
		const condMatchMedia = window.matchMedia('(prefers-color-scheme: dark)').matches;
		// Add/remove `.dark` class to HTML element
		if (condLocalStorageUserPrefs || (condLocalStorageUserPrefsExists && condMatchMedia)) {
			elemHtmlClasses.add('dark');
		} else {
			elemHtmlClasses.remove('dark');
		}
	}

	initializeStores();

	export let data;
	const { config } = data;

	//Main Spinner
	let spinner: SvelteComponent | null = null;
	subscribeSpinner((value: boolean) => {
		if (spinner) {
			spinner.toggle(value);
		}
	});

	//Assets
	let assets: SvelteComponent | null = null;
	subscribeAssetsPanel((value: AssetPickerAction) => {
		if (assets) {
			assets.toggle(value);
		}
	});
</script>

<svelte:head>
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<Toast position="t" padding="p-4" />
<Spinner id="main-spinner" bind:this={spinner}></Spinner>
<Assets id="main-spinner" bind:this={assets}></Assets>
<AppShell
	regionPage="relative"
	slotPageHeader=" sticky top-0 z-10"
	slotSidebarLeft="lg:block hidden dark:bg-surface-800 bg-surface-50 w-56 p-4 m-4 rounded-container-token"
>
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<Sidebar {config} />

		<!-- --- -->
	</svelte:fragment>

	<Drawer width="w-56">
		<div class="dark:bg-surface-800 bg-surface-50 w-full p-4 h-full rounded-container-token">
			<Sidebar {config} />
		</div>
	</Drawer>

	<div class="h-full w-full flex flex-col p-4 lg:pl-0">
		<slot />
	</div>
</AppShell>
