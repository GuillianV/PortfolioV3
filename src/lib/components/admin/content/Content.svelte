<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import Lead from '$lib/components/admin/appbar/lead/Lead.svelte';
	import Trail from '$lib/components/admin/appbar/trail/Trail.svelte';

	import { page } from '$app/stores';
	const { backlink } = $page.data;
</script>

<AppBar gap="gap-0" class="appbar">
	<svelte:fragment slot="lead">
		<Lead {backlink} />
	</svelte:fragment>
	<slot name="buttons" />
	<svelte:fragment slot="trail">
		<Trail />
	</svelte:fragment>
</AppBar>

<div class="appcontent">
	<slot />
</div>
