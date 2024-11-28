import * as THREE from 'three'
import Experience from '../index'
import Environment from './environment.js'
import Particle from './objects/particle.js'
export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
      
       
        // Wait for resources
        this.resources.on('ready', () =>
        {
             // Setup
            this.environment = new Environment()
            this.particles = new Particle({x:0,y:0,z:20})
            
        })
       

    }


    tick(){
        this.particles?.tick()
    }
}