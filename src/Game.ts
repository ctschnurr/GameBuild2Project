// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
import { AssetManager } from "./AssetManager";
import { boxHit } from "./Toolkit";
import { pointHit } from "./Toolkit";
import { Brick } from "./Brick";
import { Paddle } from "./Paddle";
import { Ball } from "./Ball";

// game setup variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;

// game object variables
let borderTop:createjs.Sprite;
let borderLeft:createjs.Sprite;
let borderRight:createjs.Sprite;

let paddle:Paddle;
let ball:Ball;
let bricks:Brick[];

let gameOver:boolean;
let lives:number = 3;

let leftKey:boolean = false;
let rightKey:boolean = false;
let spaceBar:boolean = false;

let index:number;

let STATE_START:number = 0;
let STATE_PLAYING:number = 1;
let STATE_PAUSED:number = 2;
let STATE_DEAD:number = 3;
let STATE_GAMEOVER:number = 4;

let gameState:number = 0;

function monitorKeys():void {
    if (leftKey) {
        paddle.direction = Paddle.LEFT;
        // paddle.startMe();
    } else if (rightKey) {
        paddle.direction = Paddle.RIGHT;
        //paddle.startMe();
    } else if (spaceBar) {

        switch (gameState)
        {
            case STATE_START:
                // hide title image sprite
                ball.state = Ball.STATE_MOVING;
                paddle.state = Paddle.STATE_MOVING;
                gameState = STATE_PLAYING;
            break;

            case STATE_PLAYING:
                setState(STATE_PAUSED);
            break;

            case STATE_PAUSED:
                setState(STATE_PLAYING);
            break;

            case STATE_DEAD:
                // remove dead message
                ball.state = Ball.STATE_MOVING;
                paddle.state = Paddle.STATE_MOVING;
                gameState = STATE_PLAYING;
            break;

            case STATE_GAMEOVER:
                // remove game over message
                ball.state = Ball.STATE_MOVING;
                paddle.state = Paddle.STATE_MOVING;
                gameState = STATE_PLAYING;
            break;
        }

        spaceBar = false;
    } else {
        paddle.direction = Paddle.IDLE;
    }
}

function setState(value:number) {
    // gameState = value;


    switch (value)
    {
        case STATE_START:

            gameState = value;
        break;

        case STATE_PLAYING:
            // remove paused message
            ball.state = Ball.STATE_MOVING;
            paddle.state = Paddle.STATE_MOVING;
            gameState = value;
        break;

        case STATE_PAUSED:
            // show paused message
            ball.state = Ball.STATE_PAUSED;
            paddle.state = Paddle.STATE_PAUSED;
            gameState = value;
        break;
    }
}

function monitorBrickCollisions(input: any) {

    if (boxHit(input.spriteOverlay, ball.sprite)) {
        ball.changeDirection();
        input.breakMe();
        index = bricks.indexOf(input);
        bricks.splice(index, 1);
    }

}

function monitorPaddleCollisions():void {

    if (boxHit(paddle.sprite, ball.sprite)) {
        ball.changeDirection();
    }

}

// --------------------------------------------------- event handler
function onReady(e:createjs.Event):void {
    console.log(">> all assets loaded – ready to add sprites to game");

    // construct game objects here
    borderTop = assetManager.getSprite("sprites", "sprites/borderH", 0, 0);
    borderLeft = assetManager.getSprite("sprites", "sprites/borderV", 0, 32);
    borderRight = assetManager.getSprite("sprites", "sprites/borderV", 768, 32);


    stage.addChild(borderTop);
    stage.addChild(borderLeft);
    stage.addChild(borderRight);

    setBoard();

    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;     

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function startScreen():void{
    // create a sprite title card and put here
    console.log("WELCOME TO GAME! PRESS SPACE TO CONTINUE!")

}

function setBoard():void{
    bricks = [];
    gameOver = false;

    let y:number = 40;
    let x:number = 40;
    let z:number = 0;
    let count:number = 0;
    let count2:number = 0;

    Brick.colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    for (let n = 0; n < 126; n++)
    {
        bricks[n] = new Brick(stage, assetManager);
        bricks[n].positionMe(x, y);
        bricks[n].setState(z);
        
        // cards[n].on("click", onCardClick);

        x = x + 40
        count++;
        
        if (count == 18)
        {
            y = y + 20;
            x = 40;
            if (z <= 7) z++;
            count = 0;
        } 
    }

    paddle = new Paddle(stage, assetManager);
    paddle.positionMe(360, 500);

    ball = new Ball(stage, assetManager);
    ball.positionMe(360, 400);
}

function onKeyDown(e:KeyboardEvent):void {
    // console.log("key has been pressed down: " + e.key);
    if (e.key == "ArrowLeft") leftKey = true;
    else if (e.key == "ArrowRight") rightKey = true;
    else if (e.key == " ") spaceBar = true;
}

function onKeyUp(e:KeyboardEvent):void {
    if (e.key == "ArrowLeft") leftKey = false;
    else if (e.key == "ArrowRight") rightKey = false;
    // else if (e.key == " ") spaceBar = false;
}

function onTick(e:createjs.Event) {
    // displaying frames per second - comment this out when game is published
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // this is your game loop!
    monitorKeys();
    paddle.update();
    ball.update();
    bricks.forEach(monitorBrickCollisions)
    monitorPaddleCollisions();

    // update the stage
    stage.update();
}

// --------------------------------------------------- main method
function main():void {
    console.log(">> game initialization");
    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;    

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();