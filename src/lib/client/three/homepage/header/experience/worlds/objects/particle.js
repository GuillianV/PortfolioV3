import * as THREE from 'three';
import Experience from '../../index';

export default class Particle {
	constructor(settings) {
		this.experience = new Experience();
		this.time = this.experience.time;
		this.size = this.experience.sizes;
		this.mouse = this.experience.mouse;
		this.debug = this.experience.debug;
		this.resources = this.experience.resources;
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;

		this.settings = {
			position: { x: 0, y: 0, z: 0 },
			imageJsonPath: '',
			imageSize: 0,
			imageArray: [],
			threshold: 0.3,
			particleSize: 0.145,
			inclinationPower: -0.5
		}

		this.settings.position.x ||= settings.position.x
		this.settings.position.y ||= settings.position.y
		this.settings.position.z ||= settings.position.z
		this.settings.imageJsonPath ||= settings.imageJsonPath
		this.settings.imageSize ||= settings.imageSize - 1
		this.settings.threshold ||= settings.threshold,
		this.settings.particleSize ||= settings.particleSize,
		this.settings.inclinationPower ||= settings.inclinationPower

		if (this.settings.imageJsonPath == '') {
			return
		}

		this.initialize()
		this.setDebug()
	}



	async initialize() {
		const result = await this.getData();
		if (result.success) {
			this.settings.imageArray = result.data
			this.instanciate()
		}
	}

	async instanciate() {


		if (this.mesh != null) {
			this.geometry.dispose()
			this.material.dispose()
			this.scene.remove(this.mesh)
			this.mouse.off("mousemove")
			this.camera.reset()

		}

		if (this.settings.imageArray.length == 0) {
			return
		}

		this.setGeometry();
		this.setMaterial();
		this.setMesh();
		this.setMouseMove()
	}

	async getData() {
		return await fetch(this.settings.imageJsonPath)
			.then(async (response) => {

				if (response.ok) {
					return { success: true, data: await response.json() };
				}

				return { success: false, data: null };

			}).catch((error) => {
				console.log(error);
				return { success: false, data: null };
			});
	}

	setGeometry() {

		const xBase = this.settings.imageSize;
		const yBase = Math.floor(this.settings.imageSize); // / this.size.aspectRatio
		this.baseGeometry = {};

		const positions = new Float32Array(xBase * yBase * 3);
		const colors = new Float32Array(xBase * yBase * 3);
		for (let y = 0; y <= yBase; y++) {
			for (let x = 0; x <= xBase * 3; x += 3) {
				const xKey = y * xBase * 3 + x;
				const yKey = y * xBase * 3 + x + 1;
				const zKey = y * xBase * 3 + x + 2;

				const xValue = x / 3 - (xBase - 1) / 2;
				const yValue = y - (yBase - 1) / 2;
				const zValue = 0;

				const yArray = this.settings.imageArray[this.settings.imageArray.length - 1 - y];
				const xArray = yArray[yArray.length - 1 - x / 3];
				const threshold = this.settings.threshold
				let colorR = xArray[0] / 255;
				if (colorR < threshold) colorR = threshold;
				let colorG = xArray[1] / 255;
				if (colorG < threshold) colorG = threshold;
				let colorB = xArray[2] / 255;
				if (colorB < threshold) colorB = threshold;


				this.baseGeometry[xKey] = {
					initialValue: x / 3 - (xBase - 1) / 2,
					randomCoef: Math.random() - 0.5,
					heightmap: 1 / (colorR + colorG + colorB)
				};


				colors[xKey] = colorR
				colors[yKey] = colorG
				colors[zKey] = colorB

				this.baseGeometry[yKey] = { initialValue: y - (yBase - 1) / 2, randomCoef: Math.random() - 0.5 };
				this.baseGeometry[zKey] = { initialValue: 0, randomCoef: Math.random() - 0.5 };

				positions[xKey] = xValue;
				positions[yKey] = yValue;
				positions[zKey] = zValue;
			}
		}

		this.geometry = new THREE.BufferGeometry();
		this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

	}

	setMaterial() {

		this.material = new THREE.PointsMaterial({
			size: this.settings.particleSize,
			color: 0xffffff,
			sizeAttenuation: true,
			vertexColors: true,
			depthWrite: false,
			// alphaMap: this.resources.items.particle,
			transparent: true
		});

	}

	setMesh() {

		this.mesh = new THREE.Points(this.geometry, this.material);
		this.mesh.position.z = this.settings.position.z;
		this.scene.add(this.mesh);

	}

	setDebug() {
		const folder = this.debug.gui.addFolder('Particle')
		folder.add(this.settings, 'particleSize', 0.01, 2, 0.015).onChange(() => { this.instanciate() })
		folder.add(this.settings, 'inclinationPower', -10, 10, 0.1).onChange(() => { this.instanciate() })
		folder.add(this.settings, 'threshold', 0, 1, 0.01).onChange(() => { this.instanciate() })


	}

	setMouseMove() {

		this.mouse.on('mousemove', (e) => {
			for (let i = 0; i < this.geometry.attributes.position.array.length; i += 3) {
				this.geometry.attributes.position.array[i] =
					this.baseGeometry[i].initialValue + e.x * this.settings.inclinationPower * this.baseGeometry[i].heightmap;
				this.geometry.attributes.position.array[i + 1] =
					this.baseGeometry[i + 1].initialValue + -e.y * this.settings.inclinationPower * this.baseGeometry[i].heightmap;
				this.geometry.attributes.position.array[i + 2] =
					this.baseGeometry[i + 2].initialValue + e.x * -e.y * this.settings.inclinationPower * - this.baseGeometry[i].heightmap;
			}

			this.geometry.attributes.position.needsUpdate = true;
			this.geometry.attributes.color.needsUpdate = true;
		});

	}

	tick() { }
}
