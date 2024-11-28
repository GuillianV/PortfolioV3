import * as THREE from 'three'
import Experience from '../index.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.gui = this.experience.debug.gui
        this.setEnvironementLight()
        this.setAmbiant()
        this.setSun()
        //this.setEnvironementMap()
        //this.setSpotLight()
      
      
    }

    setAmbiant(){
        this.ambiantLight = new THREE.HemisphereLight("#EECCFF","#5566AA",.7)
        this.scene.add(this.ambiantLight)

    }

    setSun(){

        this.sunLight = new THREE.DirectionalLight("#ffffff",1.5)
        this.sunLight.position.set(-10,10,-20)
        this.scene.add(this.sunLight)
    }

    setSpotLight(){
        this.spotLight = new THREE.SpotLight(0xffffff, 3.7, 35, Math.PI * 0.18, Math.PI * 0.1, 0)
        this.spotLight.position.set(0, 30, 0)
        this.spotLight.castShadow = true
        this.spotLight.shadow.mapSize.set(256, 256)
        this.spotLight.shadow.camera.left = - 12
        this.spotLight.shadow.camera.top = 12
        this.spotLight.shadow.camera.right = 12
        this.spotLight.shadow.camera.bottom = - 12
        this.spotLight.shadow.camera.far = 32
        this.spotLight.shadow.camera.near = 28


        this.gui.add(this.spotLight.shadow,'bias',0,1,0.001)
        this.gui.add(this.spotLight.shadow,'normalBias',0,1,0.001)

        this.spotLight.shadow.bias = 0.005
        this.spotLight.shadow.normalBias = 0.1
        this.scene.add(this.spotLight)
    }

    setEnvironementLight(){
        this.ambientLight = new THREE.AmbientLight(0xffffff,0.6)
        this.scene.add(this.ambientLight)
    }

    setEnvironementMap(){
        
		this.envMap = this.resources.items.environment
        this.envMap.generateMipmaps = false
        this.envMap.minFilter = THREE.NearestFilter
        this.envMap.magFilter = THREE.NearestFilter
		this.scene.background = this.envMap;
		this.scene.environment = this.envMap;
    }
 
}