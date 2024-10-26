<script lang="ts">
	import Icon from '@iconify/svelte';
	export let click = () => {};
</script>

<button
	data-button="select"
	on:click={() => {
		click();
	}}
	{...$$restProps}
>
	<Icon data-button-icon="select" icon="solar:check-square-broken" width="32" height="32" />
</button>
