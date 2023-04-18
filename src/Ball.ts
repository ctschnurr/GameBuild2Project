import { AssetManager } from "./AssetManager";

export class Ball {

    // ball direction and movement variables
    public static UP:number = 1;
    public static DOWN:number = 2;
    public static LEFT:number = 3;
    public static RIGHT:number = 4;

    private _directionV:number;
    private _directionH:number;

    private speed:number;

    // state machine for pause and active
    public static STATE_PAUSED:number = 0;
    public static STATE_MOVING:number = 1;

    private _state:number;

    // references for the stage and sprite
    private stage:createjs.StageGL;
    private _sprite:createjs.Sprite;

    // custom event!
    private eventBallDead:createjs.Event;

    // here we construct the ball object
    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        this.speed = 5;
        this._directionV = Ball.UP;
        this._directionH = Ball.RIGHT;
        this._state = Ball.STATE_PAUSED;
        this.stage = stage;

        this.eventBallDead = new createjs.Event("ballDead", true, false);

        this._sprite = assetManager.getSprite("sprites", "sprites/ball_Idle", 0, 0);
        this._sprite.play();        
        stage.addChild(this._sprite);
    }

    // used for positioning the ball on the stage
    public positionMe(x:number, y:number):void {
        this._sprite.x = x;
        this._sprite.y = y;
    }

    // returns the sprite when needed
    get sprite() {
        return this._sprite;
    }
 
    // method for changing the ball's direction
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

    // changing the ball's state to pause and unpause as needed
    set state(value:number) {
        this._state = value;
    }

    // changing the ball's vertical direction
    set directionV(value:number) {
        this._directionV = value;
    }

    // handles movement and collision with barriers
    public update():void {
        let sprite:createjs.Sprite = this._sprite;

        if (this._state == Ball.STATE_MOVING)
            {
                if (this._directionH == Ball.LEFT) {
                    // moving left
                    sprite.x = sprite.x - this.speed;
                    if (sprite.x < 40) {
                        this._directionH = Ball.RIGHT;
                        createjs.Sound.play("bounce");
                    }
                } else if (this._directionH == Ball.RIGHT) {
                    // moving right
                    sprite.x = sprite.x + this.speed;
                    if (sprite.x > 750) {
                        this._directionH = Ball.LEFT;
                        createjs.Sound.play("bounce");
                    }
                }
        
                if (this._directionV == Ball.UP) {
                    sprite.y = sprite.y - this.speed;
                    if (sprite.y < 32) {
                        this._directionV = Ball.DOWN;
                        createjs.Sound.play("bounce");
                    }
                } else if (this._directionV == Ball.DOWN) {
                    sprite.y = sprite.y + this.speed;
                    if (sprite.y > 570) {
                        this.sprite.dispatchEvent(this.eventBallDead)
                        this._state = Ball.STATE_PAUSED;
                    }
                }


            }

    }
        
}