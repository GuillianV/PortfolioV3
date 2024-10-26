<script lang="ts">
	import Icon from '@iconify/svelte';
	export let titre: string;
	export let link: string;
</script>

<a data-button="create" {...$$restProps} href={link}>
	<div class="hidden sm:block">
		{titre}
	</div>

	<Icon data-button-icon="create" icon="solar:add-circle-broken" width="32" height="32" />
</a>
