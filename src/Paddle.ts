import { AssetManager } from "./AssetManager";

export class Paddle {

    // setup states
    public static STATE_IDLE:number = 0;
    public static STATE_FLIPPED:number = 1;

    private _state:number;
    
    // custom events
    private eventCardFlip:createjs.Event;

    // the Card's sprite object
    private _sprite:createjs.Sprite;
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        // initialization of properties
        this.stage = stage;
        this._sprite = assetManager.getSprite("sprites", "cardflip", 0, 0);
        this._sprite.scaleX = 1.5;
        this._sprite.scaleY = 1.5;
        this._state = 0;
        stage.addChild(this._sprite);

        this.eventCardFlip = new createjs.Event("cardFlipped", true, false);
    }

    // ------------------------------------------------ gets/sets
    get sprite() {
        return this._sprite;
    }

    get state() {
        return this._state;
    }

    // --------------------------------------------------- public methods

    public reset():void{

        if (this._state == 1)
        {
            this.sprite.dispatchEvent(this.eventStopReady)

            if (Card._faceA == Card._faceB)
            {
                let sprite:createjs.Sprite = this._sprite;
                this._sprite.on("animationend", () => {

                    createjs.Tween.get(this._sprite, {useTicks:true}).to({alpha:0}, 10).call(() => {
                        console.log("removing sprite");
                        this.sprite.dispatchEvent(this.eventGotPair);
                        this.stage.removeChild(this._sprite);
                    }); 
                });

                this._sprite.gotoAndPlay("cardflip");
                // this.sprite.dispatchEvent(this.eventGotPair);
            }

            else
            {
                let sprite:createjs.Sprite = this._sprite;

                this._sprite.on("animationend", () => {
                this._sprite.gotoAndStop("cardback");
                this._state = 0;
                this.sprite.dispatchEvent(this.eventCardReady);
                });            
            
                this._sprite.gotoAndPlay("cardflip");
            }
        }
    }


    public flipMe():void {
        let sprite:createjs.Sprite = this._sprite;

        this._sprite.on("animationend", () => {

            switch (this._face)
            {
                case 0:
                    this._sprite.gotoAndStop("card0");
                    break;

                case 1:
                    this._sprite.gotoAndStop("card1");
                    break;

                case 2:
                    this._sprite.gotoAndStop("card2");
                    break;

                case 3:
                    this._sprite.gotoAndStop("card3");
                    break;
    
                case 4:
                    this._sprite.gotoAndStop("card4");
                    break;
    
                case 5:
                    this._sprite.gotoAndStop("card5");
                    break;

                case 6:
                    this._sprite.gotoAndStop("card6");
                    break;
    
                case 7:
                    this._sprite.gotoAndStop("card7");
                    break;
    
                case 8:
                    this._sprite.gotoAndStop("card8");
                    break;
    
                case 9:
                    this._sprite.gotoAndStop("card9");
                    break;
            }
            this.sprite.dispatchEvent(this.eventCardReady);
            this._state = 1;
        });

        this.sprite.dispatchEvent(this.eventCardFlip);
        this._sprite.gotoAndPlay("cardflip");
    }

    public positionMe(x:number, y:number):void {
        // positioning the card sprite
        this._sprite.x = x;
        this._sprite.y = y;
    }

    public faceMe():void{

        Card.faces.sort(() => Math.random() - 0.5);

        if (Card.faces.length > 0)
        {
            this._face = Card.faces[0];
            Card.faces.shift();
        }

    }

    public update():void {
        
    }

    public checkClick(x:number, y:number, turn:number):void {
        let width:number = this._sprite.getBounds().width;
        let height:number = this._sprite.getBounds().height;

        let widthBox:number = this._sprite.x + (width * 1.5);
        let heightBox:number = this._sprite.y + (height * 1.5);

        if ((x > this._sprite.x && x < widthBox) && (y > this._sprite.y && y < heightBox))
        {

            if (this._state == 0)
            {
                this.sprite.dispatchEvent(this.eventStopReady)
                this.flipMe();

                if (turn == 0) Card._faceA = this._face;
                if (turn == 1) Card._faceB = this._face;

            }
        }

    }
}