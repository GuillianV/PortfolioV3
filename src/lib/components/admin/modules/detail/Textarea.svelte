<script lang="ts">
	export let name: string;
	export let identifier: string;
	export let value: string = '';

	export let rows: number = 3;
	export let cols: number = 45;
	export let maxlength: number | undefined = undefined;
</script>

<label class="label mb-4" for={identifier}>
	<span class="ml-3 font-semibold"
		>{name}{maxlength != null ? ` (Max ${maxlength} caractères)` : ''}</span
	>
	<textarea
		class="textarea"
		{rows}
		{cols}
		{maxlength}
		id={identifier}
		name={identifier}
		{value}
		contenteditable="true"
	/>
</label>
