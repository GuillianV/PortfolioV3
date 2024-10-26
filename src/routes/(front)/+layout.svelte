<script>
	import './app.pcss';

	export let data;
	const { parametres } = data;
	const { PUBLIC_HEAD_TAG_MANAGER, PUBLIC_BODY_TAG_MANAGER } = parametres;
</script>

<svelte:head>
	{#if PUBLIC_HEAD_TAG_MANAGER && PUBLIC_HEAD_TAG_MANAGER.value != null && PUBLIC_HEAD_TAG_MANAGER.value.length > 0}
		{@html PUBLIC_HEAD_TAG_MANAGER.value}
	{/if}
</svelte:head>
<body data-sveltekit-preload-data="hover">
	{#if PUBLIC_BODY_TAG_MANAGER && PUBLIC_BODY_TAG_MANAGER.value != null && PUBLIC_BODY_TAG_MANAGER.value.length > 0}
		{@html PUBLIC_BODY_TAG_MANAGER.value}
	{/if}
	<slot />
</body>
