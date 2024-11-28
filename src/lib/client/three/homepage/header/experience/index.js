import * as THREE from 'three';
import Sizes from "./utils/sizes"
import Time from "./utils/time/time"
import Camera from './camera'
import Renderer from './renderer'
import World from './worlds/world'
import Resources from './utils/resources'
import sources from './sources'
import Debug from './utils/debug'
import Intersect from './utils/intersect';
import Mouse from './utils/mouse';


let instance = null;
export default class Experience {
	constructor(canvas) {
		if (instance !== null) {
			return instance;
		}
		instance = this;


		
        this.canvas = canvas
        this.debug = new Debug(true)
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.intersect = new Intersect()
        this.mouse = new Mouse()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.sizes.on('resize', ()=>{
            this.resize()
        })

        this.time.on('tick', ()=>{
            this.tick()
        })

        this.resources.on('ready', ()=>{
            console.log('Sources ready')
        })

        

		

	}


	resize(){
        this.camera.resize()
        this.renderer.resize()

    }

    tick(){
        this.debug.tickStart()
        this.camera.tick()
        this.renderer.tick()
        this.intersect.tick()
        this.world.tick()
        this.debug.tickEnd()
    }

}
