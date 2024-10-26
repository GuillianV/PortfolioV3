<script lang="ts">
	export let name: string;
	export let identifier: string;
	export let value: string = '';

	export let min: string | undefined = undefined;
	export let max: string | undefined = undefined;
	export let step: string | undefined = undefined;
</script>

<label class="label mb-4" for={identifier}>
	<span class="ml-3 font-semibold">{name}</span>
	<input
		class="input"
		id={identifier}
		name={identifier}
		{value}
		contenteditable="true"
		type="number"
		{min}
		{max}
		{step}
	/>
</label>
