import EventEmmiter from './event-emmiter.js'

export default class Sizes extends EventEmmiter{


    constructor(){

        super()
        
        this.width = window.innerWidth 
        this.height = window.innerHeight
        this.aspectRatio = window.innerWidth / window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio,2) 

        window.addEventListener('resize', () => {

            this.width = window.innerWidth 
            this.height = window.innerHeight
            this.aspectRatio = window.innerWidth / window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio,2) 

            this.trigger('resize')

        })
    }

}