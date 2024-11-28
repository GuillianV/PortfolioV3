import * as THREE from 'three';
import Experience from './index';
import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class Camera {
	constructor() {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.mouse = this.experience.mouse
		this.gui = this.experience.debug.gui.addFolder('Camera');
		this.setInstance();
		this.setOptions();
		this.setControls();


		this.mouse.on('mousemove', (e)=>{
			this.instance.position.x = e.x;
			this.instance.position.y = -e.y;
			this.instance.lookAt(this.scene.position);
		})

	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(75, this.sizes.aspectRatio, 0.1, 2000);
		this.instance.position.set(0, 0, -10);
		this.scene.add(this.instance);
	}

	setOptions() {
	}
	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas);
		this.controls.enableDamping = true;
		this.controls.enablePan = false;
		this.controls.enabled = false;
		this.controls.enableZoom = false;
		// this.controls.maxPolarAngle = Math.PI / 2;
		// this.controls.minPolarAngle = Math.PI / 2;

	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.updateProjectionMatrix();
	}

	tick() {
		this.controls.update();
	}

	lookAt(position = { x: 0, y: 0, z: 0 }) {
		const { x, y, z } = position;
		gsap.to(this.instance.position, {
			x,
			y,
			z,
			duration: 2,
			ease: 'linear'
		});

		this.controls.autoRotate = false;
	}
}
