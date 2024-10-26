<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	export let backlink: string | null;

	const drawerStore = getDrawerStore();

	function drawerOpen() {
		drawerStore.open({});
	}
</script>

<button class="btn-menu" on:click={drawerOpen}>
	<Icon
		class="text-tertiary-500 dark:text-surface-100 "
		icon="solar:hamburger-menu-broken"
		width="32"
		height="32"
	/>
</button>

{#if backlink != null && backlink.length > 0}
	<a href={backlink} class="back-a">
		<Icon class="back-icon" icon="solar:alt-arrow-left-bold-duotone" width="32" height="32" />
	</a>
{/if}
