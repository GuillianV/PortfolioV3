import * as THREE from 'three';
import Experience from '../../index';

export default class Particle {
	constructor(position = { x: 0, y: 0, z: 0 }) {
		this.experience = new Experience();
		this.time = this.experience.time;
		this.size = this.experience.sizes;
		this.mouse = this.experience.mouse;
		this.debug = this.experience.debug;
		this.resources = this.experience.resources;
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;
		this.startPosition = position;
		this.particlesMesh = null;

		this.instanciate()
	}

	async instanciate() {

		const result = await this.getData('/json/header-bg.json');
		this.setGeometry(result.data);
		this.setMaterial();
		this.setMesh();
	}

	async getData(path) {
		return await fetch(path)
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

	setGeometry(imagePixelsData) {

		const baseNumber = 200;
		const xBase = baseNumber;
		const yBase = Math.floor(baseNumber); // / this.size.aspectRatio
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

				const yArray = imagePixelsData[imagePixelsData.length - 1 - y];
				const xArray = yArray[yArray.length - 1 - x / 3];

				let colorR = xArray[0] / 255;
				if (colorR < 0.3) colorR = 0.3;
				let colorG = xArray[1] / 255;
				if (colorG < 0.3) colorG = 0.3;
				let colorB = xArray[2] / 255;
				if (colorB < 0.3) colorB = 0.3;


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

		const geometry = new THREE.BufferGeometry();

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		this.geometry = geometry;

	}

	setMaterial() {

		const material = new THREE.PointsMaterial({
			size: 0.25,
			color: 0xffffff,
			sizeAttenuation: true,
			vertexColors: true,
			depthWrite: false,
			// alphaMap: this.resources.items.particle,
			blending: THREE.AdditiveBlending,
			transparent: true
		});
		this.material = material;

	}

	setMesh() {

		const mesh = new THREE.Points(this.geometry, this.material);
		mesh.position.z = this.startPosition.z;
		this.particlesMesh = mesh;
		this.scene.add(mesh);


		this.mouse.on('mousemove', (e) => {
			for (let i = 0; i < this.geometry.attributes.position.array.length; i += 3) {
				this.geometry.attributes.position.array[i] =
					this.baseGeometry[i].initialValue + e.x * 2 * this.baseGeometry[i].heightmap;
				this.geometry.attributes.position.array[i + 1] =
					this.baseGeometry[i + 1].initialValue + -e.y * 2 * this.baseGeometry[i].heightmap;
				this.geometry.attributes.position.array[i + 2] =
					this.baseGeometry[i + 2].initialValue + e.x * -e.y * 2 * this.baseGeometry[i].heightmap;
			}

			this.geometry.attributes.position.needsUpdate = true;
			this.geometry.attributes.color.needsUpdate = true;
		});
	}

	tick() { }
}
