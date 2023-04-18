import { AssetManager } from "./AssetManager";

export class Brick {

    // state machine to handle the color components
    public static STATE_RED:number = 0;
    public static STATE_ORANGE:number = 1;
    public static STATE_YELLOW:number = 2;
    public static STATE_GREEN:number = 3;
    public static STATE_BLUE:number = 4;
    public static STATE_INDIGO:number = 5;
    public static STATE_VIOLET:number = 6;

    private _state:number;

    // sprite related variables
    private _sprite:createjs.Sprite;
    private _spriteOverlay:createjs.Sprite;
    private stage:createjs.StageGL;

    // constructing bricks!
    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        this.stage = stage;
        this._sprite = assetManager.getSprite("sprites", "sprites/brick_red", 0, 0);
        this._spriteOverlay = assetManager.getSprite("sprites", "sprites/brick_Idle", 0, 0);
        stage.addChild(this._sprite);
        stage.addChild(this._spriteOverlay);
        this._spriteOverlay.play();
        this._state = 0;
    }

    // used to position the brick in the needed space
    public positionMe(x:number, y:number):void {
        this._spriteOverlay.x = x;
        this._spriteOverlay.y = y;

        this._sprite.x = x;
        this._sprite.y = y;
    }

    // returns the brick's color sprite
    get sprite() {
        return this._sprite;
    }

    // returns the box overlay for the brick
    get spriteOverlay() {
        return this._spriteOverlay;
    }

    // sets the state/assigns the color for the brick
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

    // handles the destruction of bricks
    public breakMe():void{
    
        let sprite:createjs.Sprite = this._spriteOverlay;
        createjs.Sound.play("brickBreak");
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