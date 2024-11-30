<script lang="ts">
	import Experience from "$lib/client/three/homepage/header/experience/index.js";
	import { onMount } from "svelte";
	import gsap from "gsap";
	export let canvas: HTMLCanvasElement;
	export let data;

	onMount(() => {
		const scene = new Experience(canvas);

		SynopsisAnimation();
	});

	function SynopsisAnimation() {
		const link = document.getElementById("aboutLink");
		const anim = document.getElementById("aboutAnim");

		if (!link || !anim) {
			return;
		}

		let tl = gsap.timeline();
		tl.to(anim, {
			width: 3000,
			height: 3000,
			duration: 0.8,
			ease: "power1.in",
		});

		tl.pause(0);

		link.addEventListener("mouseenter", () => {
			tl.play();
		});

		link.addEventListener("mouseleave", () => {
			tl.reverse();
		});
	}
</script>

<div
	class="h-[110vh] w-full flex flex-col justify-center items-center relative"
>
	<div class="w-3/4 z-10 relative">
		<h1 class="text-6xl text-surface-500">Guillian Vibert-Vallet</h1>
		<h4 class="text-3xl text-surface-500 font-secondary-sm">
			Développeur <span>full-stack passionné</span>, je transforme les
			idées en solutions innovantes,<br /> explorant les horizons de la
			programmation <span>sans limites !</span>
		</h4>
	</div>

	<div
		class="w-full h-[10vh] absolute bottom-0 left-0 z-20 bg-gradient-to-t from-white to-transparent"
	></div>
	<canvas
		bind:this={canvas}
		class="absolute top-0 left-0 w-full h-[110vh] z-0"
		id="canvas"
	></canvas>
</div>

<div
	class="h-full w-full flex flex-col mt-16 justify-center items-center relative z-20"
>
	<div
		class="w-3/4 flex flex-row justify-center items-center z-10 relative bg-white border-2 border-surface-500 rounded-full overflow-hidden"
	>
		<div class="w-1/5 rounded-full p-4">
			<div
				class="relative rounded-full overflow-hidden border-2 border-surface-500 h-full p-4"
			>
				<img
					src="/images/header-bg.jpg"
					alt="Guillian Vibert-Vallet"
					class="w-full"
				/>
			</div>
		</div>

		<div class="w-3/5 p-4 flex flex-col text-left items-center">
			<h2 class="text-4xl w-full mb-4 text-surface-500">Synopsis</h2>

			Bonjour, si vous êtes ici, c'est que vous etes intéressé par ma
			personne ou mon travail.<br /> Je vous remercie de votre intérêt.
			Pour me présenter en un mot, je choisierai la curiosité.<br /><br />

			Détenteur d'un master développeur full-stack, je vous propose de
			découvrir mon parcours professionnel et de vous montrer comment je
			travaille.<br /><br />

			Si vous souhaitez en savoir plus sur moi, n'hésitez pas à me
			contacter !
		</div>

		<div class="w-1/5 relative rounded-tr-full rounded-br-full">
			<div
				id="aboutAnim"
				class="z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface-500 bg-white w-32 h-32 flex justify-center items-center"
			></div>
			<a href="/about"
				id="aboutLink"
				class="z-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-28 h-28 flex justify-center items-center"
			>
				<p class="text-center underline underline-offset-2 ">A propos</p>
			</a>
		</div>
	</div>
</div>

<!-- 
Depuis quelques
années, maintenant, je suis faciné par la programmation et la
technologie. J'ai commencé mes premières experiences début lycée en
2016, avec le langage de programmation C. Au début, j'étais surtout
interessé par la robotique et l'algorythmie grace à ma spécialité
SIN lors de mon BAC STI2D. C'est seulement fin 2018 que j'ai décidé
de me lancer dans le monde du développement web. Je suis alors parti
en DUT Informatique à Annecy pour me professionnaliser dans le
domaine. C'est à ce moment la, que la programmation s'est transformé
en passion ! Plus j'en apprenais, plus de nouvelles portes se
présentaient à moi. C'est à ce moment là que j'ai découvert d'autres
types de programmations. Programmation logicielle, Intelligence
Artificielle, Applications mobiles, Jeu vidéo, Déploiement Continu,
Architecture , réseau, etc. J'ai donc décidé par la suite de me
lancer dans Liscence Profesionelle DIM (Développeur Informatique
Multisupports). Cette licence m'a permis de rentrer dans le monde de
l'entreprise en 2020. Pour terminer mon parcours, j'ai décidé, en
accord avec mon entreprise, de finir par un master full-stack de
2022 à 2024. En parrallele, j'ai aussi crée ma micro-entreprise :
GVVInfo. -->
