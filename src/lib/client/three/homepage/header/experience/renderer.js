import * as THREE from 'three'
import Experience from './index'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance(){

        this.instance=new THREE.WebGLRenderer({
            canvas:this.canvas,
            alpha:true,
            antialias:true
        })
        this.instance.outputColorSpace = THREE.LinearSRGBColorSpace
        this.instance.useLegacyLights = true
        this.instance.toneMapping = THREE.ACESFilmicToneMapping
        this.instance.toneMappingExposure = 1
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)

    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    tick(){

        this.instance.render(this.scene, this.camera.instance)
    }
}