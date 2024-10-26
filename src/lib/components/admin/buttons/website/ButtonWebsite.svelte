<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<a data-button="website" {...$$restProps} target="_blank" href="/">
	<div class="hidden sm:block">Voir le site</div>

	<Icon data-button-icon="website" icon="solar:eye-broken" width="32" height="32" />
</a>
