<script lang="ts">
	import Contact from '$lib/components/Contact.svelte';

	export let data;
	const { parametres } = data;
	const { PUBLIC_RECAPCHA_SITEKEY } = parametres;
</script>

<h1 class="text-5xl">Home</h1>
<Contact {PUBLIC_RECAPCHA_SITEKEY} />
