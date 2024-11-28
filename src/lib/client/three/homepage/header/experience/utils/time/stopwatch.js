import Experience from "../../index"

export default class Stopwatch{



    constructor(eventName = "" ,options = {
        seconds:1,
        once:true,
        tickInterval:1
    }){

           
        const {seconds,once,tickInterval} = options
        
        this.experience = new Experience()
        this.time = this.experience.time
        this.start = this.time.current
        this.startSecond = this.time.current
        this.seconds = seconds
        this.once = once
        this.tickInterval = tickInterval
        this.eventName = eventName

        return this;

    }


    tick(){


            if(this.time.current - this.start >= this.seconds * 1000){
                this.time.trigger(this.eventName)

                if(this.once){
                    
                    this.time.removeStopwatch(this.eventName)
                    return
                }else{
                    this.start = this.time.current
                }

            }

            
            if(this.tickInterval != null  && this.time.current - this.startSecond >= this.tickInterval){
                this.time.trigger(`${this.eventName}-tick`)
                this.startSecond = this.time.current
            }

    }

}