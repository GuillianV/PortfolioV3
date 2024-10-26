<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
</script>

<form
	method="POST"
	action="/admin/logout"
	use:enhance={() => {
		return () => {
			window.location.href = '/admin/login';
		};
	}}
>
	<button data-button="disconect" {...$$restProps} type="submit" value="logout" title="Deconnexion">
		<div>Déconnexion</div>

		<Icon data-button-icon="disconect" icon="solar:user-cross-linear" width="32" height="32" />
	</button>
</form>
