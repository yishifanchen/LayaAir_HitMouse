export default class mouse extends Laya.Script {
/** @prop {name:mouse_type, tips:"老鼠类型", type:Int, default:1}*/
    constructor() { 
        super(); 
        this.mouse_type=1;
        this.time_line=null;
        this.is_dead=false;
    }
    
    onEnable() {
    }

    onDisable() {
    }
    show_mouse(mgr,type,hole_index){
        this.mgr=mgr;
        this.mouse_type=type;
        this.hole_index=hole_index;
        this.owner.skin="res/mouse_normal_"+this.mouse_type+".png";

        this.owner.scaleX=0;
        this.owner.scaleY=0;

        var time_line=Laya.TimeLine.to(this.owner,{scaleX:1,scaleY:1},300);
        time_line.to(this.owner,{scaleX:0,scaleY:0},300,null,1000);
        time_line.play(0,false);
        time_line.on(Laya.Event.COMPLETE,this,function(){
            this.owner.removeSelf();
        });
        this.time_line=time_line;
    }
    onStart(){
        //this.show_mouse(this.mouse_type);
    }
    play_hit_anim(){
        if(this.time_line!=null){
            this.time_line.destroy();
            this.time_line=null;
        }

        this.owner.skin="res/mouse_hit_"+this.mouse_type+".png";
        var time_line=Laya.TimeLine.to(this.owner,{scaleX:0,scaleY:0},300,null,500);
        time_line.play(0,false);
        time_line.on(Laya.Event.COMPLETE,this,function(){
            this.owner.removeSelf();
        });
    }
    onClick(){
        if(this.is_dead){
            return;
        }
        this.is_dead=true;
        this.play_hit_anim();

        this.mgr.on_mouse_hit(this.mouse_type,this.hole_index);
    }
}