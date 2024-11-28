<script lang="ts">

	import Experience from '$lib/client/three/homepage/header/experience/index.js';
    import { onMount } from 'svelte';

	export let canvas : HTMLCanvasElement;
    export let data

    onMount(() => {
      const scene =   new Experience(canvas)
    })

</script>


<div class="h-screen w-full flex flex-col justify-center items-center">


	<div class="w-3/4">
		<h1 class="text-6xl text-surface-500">Guillian Vibert-Vallet</h1>
		<h4 class="text-3xl text-surface-500 font-secondary-sm">Développeur full-stack passionné, je transforme les idées en solutions innovantes, explorant les horizons de la programmation sans limites !</h4>
	</div>


	<canvas bind:this={canvas} class="absolute top-0 left-0 w-full h-full" id="canvas"></canvas>
</div>
