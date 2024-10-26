<script lang="ts">
	import Icon from '@iconify/svelte';
	export let titre: string;
	export let click = () => {};
</script>

<button
	data-button="save"
	on:click={() => {
		click();
	}}
	{...$$restProps}
>
	<div>
		{titre}
	</div>

	<Icon data-button-icon="save" icon="solar:check-circle-broken" width="32" height="32" />
</button>
