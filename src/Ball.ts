import { AssetManager } from "./AssetManager";

export class Ball {

    public static UP:number = 1;
    public static DOWN:number = 2;
    public static LEFT:number = 3;
    public static RIGHT:number = 4;

    public static STATE_PAUSED:number = 0;
    public static STATE_MOVING:number = 1;

    private speed:number;
    private _state:number;
    private _directionV:number;
    private _directionH:number;

    private stage:createjs.StageGL;

    private _sprite:createjs.Sprite;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        // initialization of properties
        this.speed = 5;
        this._directionV = Ball.UP;
        this._directionH = Ball.RIGHT;
        this._state = Ball.STATE_PAUSED;
        this.stage = stage;

        this._sprite = assetManager.getSprite("sprites", "sprites/ball_Idle", 0, 0);
        // this._sprite.scaleX = 1.5;
        // this._sprite.scaleY = 1.5;
        this._sprite.play();        
        stage.addChild(this._sprite);
    }

    public positionMe(x:number, y:number):void {
        this._sprite.x = x;
        this._sprite.y = y;
    }

    get sprite() {
        return this._sprite;
    }

    // get direction() {
    //     return this._direction;
    // }
 
    public changeDirection()
    {
        switch (this._directionV)
        {
            case Ball.UP:
                this._directionV = Ball.DOWN;
                break;
                
            case Ball.DOWN:
                this._directionV = Ball.UP;
                break;
        }

    }

    set state(value:number) {
        this._state = value;
    }

    public update():void {
        let sprite:createjs.Sprite = this._sprite;

        if (this._state == Ball.STATE_MOVING)
            {
                if (this._directionH == Ball.LEFT) {
                    // moving left
                    sprite.x = sprite.x - this.speed;
                    if (sprite.x < 40) {
                        this._directionH = Ball.RIGHT;
                    }
                } else if (this._directionH == Ball.RIGHT) {
                    // moving right
                    sprite.x = sprite.x + this.speed;
                    if (sprite.x > 750) {
                        this._directionH = Ball.LEFT;
                    }
                }
        
                if (this._directionV == Ball.UP) {
                    sprite.y = sprite.y - this.speed;
                    if (sprite.y < 32) {
                        this._directionV = Ball.DOWN;
                    }
                } else if (this._directionV == Ball.DOWN) {
                    sprite.y = sprite.y + this.speed;
                    if (sprite.y > 570) {
                        console.log("DEAD!");
                        this._state = Ball.STATE_PAUSED;
                    }
                }


            }

    }
        
}