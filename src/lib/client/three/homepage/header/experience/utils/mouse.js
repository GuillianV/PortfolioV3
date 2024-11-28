import * as THREE from 'three';
import EventEmmiter from './event-emmiter.js';
import Experience from '../index.js';

export default class Mouse extends EventEmmiter {
	constructor() {

        super()

        this.experience = new Experience()
        this.mouse = new THREE.Vector2();
        this.sizes = this.experience.sizes;

		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1;
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1;
           

            this.trigger('mousemove', [this.mouse])

		});

        


	}

}
