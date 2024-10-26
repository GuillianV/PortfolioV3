<script lang="ts">
	import Content from '$lib/components/admin/content/Content.svelte';
	import AnalyticsReport from '$lib/components/admin/googleapis/analytics/AnalyticsReport.svelte';
</script>

<Content>
	<svelte:fragment slot="buttons">
		<!-- Buttons ici -->
	</svelte:fragment>

	<div
		class="dark:bg-surface-800 bg-surface-50 p-4 rounded-container-token w-full h-full slot-container"
	>
		<h1 class="h1">Home</h1>

		<AnalyticsReport />
	</div>
</Content>
