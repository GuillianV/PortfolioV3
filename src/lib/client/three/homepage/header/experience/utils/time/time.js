import { tick } from "svelte";
import EventEmitter from "../event-emmiter";
import Stopwatch from "./stopwatch";

export default class Time extends EventEmitter{



    constructor(){

        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        this.test =0

        this.stopwatchs = []

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })

    }

    setStopwatch(stopwatch){
        
        if(stopwatch instanceof Stopwatch){
            this.stopwatchs.push(stopwatch)
        }

        return this
    }

    removeStopwatch(stopwatchName){
        const index = this.stopwatchs.indexOf(this.stopwatchs.find(obj => obj.eventName === stopwatchName))
        this.stopwatchs.splice(index,1)
    }


    tick(){

        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        let stopwatchsIterate = 0
        while(stopwatchsIterate < this.stopwatchs.length){
            this.stopwatchs[stopwatchsIterate].tick()
            stopwatchsIterate++
            
        }

        window.requestAnimationFrame(()=>{this.tick()})
    }

}