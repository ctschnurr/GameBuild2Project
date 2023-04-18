import { AssetManager } from "./AssetManager";

export class Paddle {

    public static LEFT:number = 3;
    public static IDLE:number = 4;
    public static RIGHT:number = 5;

    public static STATE_IDLE:number = 0;
    public static STATE_MOVING:number = 1;
    public static STATE_PAUSED:number = 2;

    private speed:number;
    private _state:number;
    private _direction:number;

    private stage:createjs.StageGL;

    private _sprite:createjs.Sprite;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        // initialization of properties
        this.speed = 7;
        this._direction = Paddle.IDLE;
        this._state = Paddle.STATE_PAUSED;
        this.stage = stage;

        this._sprite = assetManager.getSprite("sprites", "sprites/paddle", 0, 0);
        this._sprite.play();        
        stage.addChild(this._sprite);
    }

    public positionMe(x:number, y:number):void {
        this._sprite.x = x;
        this._sprite.y = y;
    }

    get direction() {
        return this._direction;
    }

    set direction(value:number) {
        this._direction = value;
    }

    set state(value:number) {
        this._state = value;
    }

    get sprite() {
        return this._sprite;
    }

    public update():void {
        let sprite:createjs.Sprite = this._sprite;

        if (this._state == Paddle.STATE_MOVING)
        {
            if (this._direction == Paddle.LEFT) {
                // moving left
                sprite.x = sprite.x - this.speed;
                if (sprite.x < 40) {
                    sprite.x = 40;
                }
            } else if (this._direction == Paddle.RIGHT) {
                // moving right
                sprite.x = sprite.x + this.speed;
                if (sprite.x > 675) {
                    sprite.x = 675;
                }
            } else if (this._direction == Paddle.IDLE) {
    
            }
        }

    }
}