<script lang="ts">
	import Icon from '@iconify/svelte';
	export let click = () => {};
</script>

<button
	on:click={() => {
		click();
	}}
	data-button="quit"
	{...$$restProps}
>
	<Icon data-button-icon="quit" icon="solar:traffic-economy-broken" width="32" height="32" />
</button>
