import * as THREE from 'three';
import EventEmmiter from './event-emmiter.js';
import Experience from '../index.js';

export default class Intersect extends EventEmmiter {
	constructor() {

        super()

        this.experience = new Experience()
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;
		this.instance = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
        this.objects = {};
        this.currentIntersect = null


		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1;
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1;
		});

        
        window.addEventListener("click", e=>{

            if(this.currentIntersect !== null){
                
                this.trigger(`${this.currentIntersect.name}-click`,[this.currentIntersect])
            }

        })

        window.addEventListener("mousedown", e=>{

            if(this.currentIntersect !== null){
                
                this.trigger(`${this.currentIntersect.name}-drag`,[this.currentIntersect])
            }

        })


	}

    setObject(data = {
        object : null,
        name : null,
        mouseEnter : false,
        mouseLeave : false,
        mouseClick : false
    }){
        const {
            object,
            name,
            mouseEnter = false,
            mouseLeave = false,
            mouseClick = false
        } = data;

        if(typeof name === 'string' && object.isObject3D && (mouseEnter != false || mouseLeave != false || mouseClick != false )){

            this.objects[name] = data

        }else
            console.error("Intersect set object Error ",name ?? 'null')

    }

    removeObject(name = null){
        if(typeof name === 'string'){
           delete this.objects[name]
        }
    }

    removeAllObjects(){
        this.objects = {}
    }

	tick() {

        if(!this.camera || !this.mouse)
            return

        this.instance.setFromCamera(this.mouse,this.camera.instance)

        
        for (const objectKey in this.objects){

            const object = this.objects[objectKey]

            let intersects = this.instance.intersectObject(object.object)

            if(intersects.length > 0)
            {

                if(! this.currentIntersect && object.mouseLeave == true){
                    
                    this.trigger(`${object.name}-enter`,object)
                    // console.log("mouse enter");
                }
                this.currentIntersect = object
            }
            else{
                if( this.currentIntersect){
                    this.trigger(`${object.name}-leave`,object)
                    // console.log("mouse leave");
                }
                this.currentIntersect = null
            }

        }

    }
}
