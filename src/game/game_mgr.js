var game_config=require("./game_config");
import mouse from "./mouse"
import hammer from "./hammer"
    
export default class game_mgr extends Laya.Script {
/** @prop {name:mouse_prefab, tips:"老鼠预制体", type:Prefab, default:null}*/
/** @prop {name:mouse_root,tips:"老鼠父亲节点",type:Node,default:null}*/
/** @prop {name:hammer,tips:"锤子",type:Node,default:null}*/
    constructor() { 
        super(); 
        this.mouse_prefab=null;
        this.mouse_root=null;
        this.hammer=null;
    }
    
    onEnable() {
    }

    onDisable() {
    }

    onUpdate(){
        //console.log(this.owner.width,this.owner.height);
    }
    gen_one_mouse(){
        var m=this.mouse_prefab.create();
        this.mouse_root.addChild(m);

        var hole_index=Math.random()*9;
        hole_index=Math.floor(hole_index);
        m.x=game_config.mouse_pos[hole_index].x;
        m.y=game_config.mouse_pos[hole_index].y;


        var mouse_type=Math.random()<0.5?1:2;
        m.getComponent(mouse).show_mouse(this,mouse_type,hole_index);

        var time=(2+Math.random()*2)*1000;
        time=Math.floor(time);

        Laya.timer.once(time,this,this.gen_one_mouse);
    }

    on_mouse_hit(mouse_type,hole_index){
        this.hammer.x=game_config.hammer_pos[hole_index].x;
        this.hammer.y=game_config.hammer_pos[hole_index].y;
        this.hammer_com.play_anim();
    }

    onStart(){
        this.hammer_com=this.hammer.getComponent(hammer);
        this.gen_one_mouse();
    }
}