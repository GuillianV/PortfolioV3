<script>
	import Header from "$lib/components/Header.svelte";
	import "./app.pcss";

	import gsap from "gsap";
	import ScrollTrigger from "gsap/dist/ScrollTrigger";
	import ScrollSmoother from "gsap/dist/ScrollSmoother";
	import { onMount } from "svelte";
	import { onNavigate } from "$app/navigation";
    import Footer from "$lib/components/Footer.svelte";

	export let data;
	let smoothScroll;
	const { parametres } = data;
	const { PUBLIC_HEAD_TAG_MANAGER, PUBLIC_BODY_TAG_MANAGER } = parametres;


	onMount((_) => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
		loadSmoothScroll();
	});

	function loadSmoothScroll() {
		smoothScroll?.scrollTop(0);
		smoothScroll?.kill();
		smoothScroll = ScrollSmoother.create({
			autoResize: true, // automatically call update() when window is resized
			smooth: 1,
			normalizeScroll: false,
			effects: true, // looks for data-speed and data-lag attributes on elements
			// smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
		});
	}

	function animate() {
		loadSmoothScroll();
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			animate();
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;

				animate();
			});
		});
	});
</script>

<svelte:head>
	{#if PUBLIC_HEAD_TAG_MANAGER && PUBLIC_HEAD_TAG_MANAGER.value != null && PUBLIC_HEAD_TAG_MANAGER.value.length > 0}
		{@html PUBLIC_HEAD_TAG_MANAGER.value}
	{/if}
</svelte:head>
<body data-sveltekit-preload-data="hover" data-theme="front">
	<Header />

	{#if PUBLIC_BODY_TAG_MANAGER && PUBLIC_BODY_TAG_MANAGER.value != null && PUBLIC_BODY_TAG_MANAGER.value.length > 0}
		{@html PUBLIC_BODY_TAG_MANAGER.value}
	{/if}

	<div class="app" id="smooth-wrapper">
		<div id="smooth-content">
			<main>
				<slot />
				<Footer />
			</main>
		</div>
	</div>


</body>
