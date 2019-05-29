export default class hammer extends Laya.Script {

    constructor() { 
        super(); 
        
    }
    
    onEnable() {
    }

    onDisable() {
    }
    play_anim(){
        var time=100;
        this.owner.alpha=1;
        var time_line=Laya.TimeLine.to(this.owner,{rotation:9},time);
        time_line.to(this.owner,{rotation:-9},time*2);
        time_line.to(this.owner,{rotation:0},time,null,100);  
        time_line.to(this.owner,{alpha:0},200,null,1000);
        time_line.play(0,false);
    }
    onStart(){
        //this.play_anim();
    }
}