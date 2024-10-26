<script lang="ts">
	export let name: string;
	export let identifier: string;
	export let value: string = '';
</script>

<label class="label mb-4" for={identifier}>
	<span class="ml-3 font-semibold">{name}</span>
	<input
		class="input"
		id={identifier}
		name={identifier}
		{value}
		contenteditable="true"
		type="text"
	/>
</label>
