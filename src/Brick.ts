import { AssetManager } from "./AssetManager";

export class Brick {

    public static STATE_RED:number = 0;
    public static STATE_ORANGE:number = 1;
    public static STATE_YELLOW:number = 2;
    public static STATE_GREEN:number = 3;
    public static STATE_BLUE:number = 4;
    public static STATE_INDIGO:number = 5;
    public static STATE_VIOLET:number = 6;

    private _state:number;

    static colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    private _sprite:createjs.Sprite;
    private _spriteOverlay:createjs.Sprite;
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        // initialization of properties
        this.stage = stage;
        this._sprite = assetManager.getSprite("sprites", "sprites/brick_red", 0, 0);
        this._spriteOverlay = assetManager.getSprite("sprites", "sprites/brick_Idle", 0, 0);
        stage.addChild(this._sprite);
        stage.addChild(this._spriteOverlay);
        this._spriteOverlay.play();
        this._state = 0;
    }

    public positionMe(x:number, y:number):void {
        this._spriteOverlay.x = x;
        this._spriteOverlay.y = y;

        this._sprite.x = x;
        this._sprite.y = y;
    }

    get sprite() {
        return this._sprite;
    }

    get spriteOverlay() {
        return this._spriteOverlay;
    }

    public setState(z:number):void {
        this._state = z;

        switch(z)
        {
            case 0:
                this._sprite.gotoAndPlay("sprites/brick_red");
                break;
                
            case 1:
                this._sprite.gotoAndPlay("sprites/brick_orange");
                break;

            case 2:
                this._sprite.gotoAndPlay("sprites/brick_yellow");
                break;

            case 3:
                this._sprite.gotoAndPlay("sprites/brick_green");
                break;
                
            case 4:
                this._sprite.gotoAndPlay("sprites/brick_blue");
                break;

            case 5:
                this._sprite.gotoAndPlay("sprites/brick_indigo");
                break;

            case 6:
                this._sprite.gotoAndPlay("sprites/brick_violet");
                break;
        }

    }

    public breakMe():void{
    
        let sprite:createjs.Sprite = this._spriteOverlay;
        this._spriteOverlay.on("animationend", () => {

            this._spriteOverlay.stop();
            createjs.Tween.get(this._spriteOverlay, {useTicks:true}).to({alpha:0}, 10).call(() => {
                console.log("removing sprite");
                //this.sprite.dispatchEvent(this.eventGotPair);
                this.stage.removeChild(this._sprite);
                this.stage.removeChild(this._spriteOverlay);
            }); 
        });
        
        this._spriteOverlay.gotoAndPlay("sprites/brick_Destroy");
    }

}