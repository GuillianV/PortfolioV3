import GUI from 'lil-gui'; 
import Stats from 'stats.js'

export default class Debug {


    constructor(enable = true){
        this.setGUI()
        this.setFPS()
        this.setHidden(enable)
    }

    setGUI(){
        this.gui = new GUI()
    }

    setFPS(){

        this.stats = new Stats()
        this.stats.showPanel(0) 
    }

    setHidden(enable){
        if(!enable){
            this.gui.hide()
        }else{
            document.body.appendChild(this.stats.dom)
        }
           
    }

    tickStart(){
        this.stats.begin()
    }

    tickEnd(){
        this.stats.end()
    }
}