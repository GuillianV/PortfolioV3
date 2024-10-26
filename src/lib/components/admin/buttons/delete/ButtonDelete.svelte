<script lang="ts">
	import Icon from '@iconify/svelte';
	export let click = () => {};
</script>

<button
	on:click={() => {
		click();
	}}
	data-button="delete"
	{...$$restProps}
>
	<div>Supprimer</div>

	<Icon data-button-icon="delete" icon="solar:minus-circle-broken" width="32" height="32" />
</button>
