// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST, BALL_RESET_X, BALL_RESET_Y, PADDLE_RESET_X, PADDLE_RESET_Y } from "./Constants";
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
let background:createjs.Sprite;

// cards and menus variables
let title:createjs.Sprite;
let death:createjs.Sprite;
let gameOver:createjs.Sprite;
let pressStart:createjs.Sprite;
let pause:createjs.Sprite;
let win:createjs.Sprite;

// sprites to represent remaining lives
let life1:createjs.Sprite;
let life2:createjs.Sprite;
let life3:createjs.Sprite;

// the paddle, ball and bricks!
let paddle:Paddle;
let ball:Ball;
let bricks:Brick[];

// player lives
let lives:number = 3;

// variables for controls
let leftKey:boolean = false;
let rightKey:boolean = false;
let spaceBar:boolean = false;

// used in passing bricks into methods
let index:number;

// state machine for the game itself
let STATE_START:number = 0;
let STATE_PLAYING:number = 1;
let STATE_PAUSED:number = 2;
let STATE_DEAD:number = 3;
let STATE_GAMEOVER:number = 4;
let STATE_TITLE:number = 5;
let STATE_WIN:number = 6;

let gameState:number = 5;

// method for monitoring input, and the space bar's behaviors
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
            case STATE_TITLE:
                setState(STATE_START)
            break;

            case STATE_START:
                setState(STATE_PLAYING)
            break;

            case STATE_PLAYING:
                setState(STATE_PAUSED);
            break;

            case STATE_PAUSED:
                setState(STATE_PLAYING);
            break;

            case STATE_DEAD:
                setState(STATE_START);
            break;

            case STATE_GAMEOVER:
                setBoard();
                setState(STATE_START);
            break;

            case STATE_WIN:
                setBoard();
                setState(STATE_START);
            break;
        }

        spaceBar = false;
    } else {
        paddle.direction = Paddle.IDLE;
    }
}

// changes the game's state and performs related operations
function setState(value:number) {
    switch (value)
    {
        case STATE_START:
            stage.removeChild(title);
            stage.addChild(pressStart);
            if (life1.isVisible) stage.removeChild(life1);
            if (life2.isVisible) stage.removeChild(life2);
            if (life3.isVisible) stage.removeChild(life3);
            if (death.isVisible) stage.removeChild(death);
            if (gameOver.isVisible) stage.removeChild(gameOver);
            if (win.isVisible) stage.removeChild(win);
            gameState = value;
        break;

        case STATE_PLAYING:
            createjs.Sound.play("bounce1");
            if (pressStart.isVisible) stage.removeChild(pressStart);
            if (pause.isVisible) stage.removeChild(pause);
            if (life1.isVisible) stage.removeChild(life1);
            if (life2.isVisible) stage.removeChild(life2);
            if (life3.isVisible) stage.removeChild(life3);
            ball.state = Ball.STATE_MOVING;
            paddle.state = Paddle.STATE_MOVING;
            gameState = value;
        break;

        case STATE_PAUSED:
            stage.addChild(pause);
            stage.addChild(pressStart);
            if (lives == 3)
            {
                stage.addChild(life3);
                stage.addChild(life2);
                stage.addChild(life1);
            }
            else if (lives == 2) 
            {
                stage.addChild(life2);
                stage.addChild(life1);
            } 
            
            else if (lives == 1) stage.addChild(life1);
            ball.state = Ball.STATE_PAUSED;
            paddle.state = Paddle.STATE_PAUSED;
            gameState = value;
        break;

        case STATE_DEAD:
            createjs.Sound.play("dead");
            lives--;
            stage.addChild(death);
            if (lives == 0)
            {
                setState(STATE_GAMEOVER);
                break;
            }
            if (lives == 2) 
            {
                stage.addChild(life2);
                stage.addChild(life1);
            } else if (lives == 1) stage.addChild(life1);

            gameState = STATE_DEAD;
            ball.directionV = Ball.UP;
            ball.positionMe(BALL_RESET_X, BALL_RESET_Y);
            paddle.positionMe(PADDLE_RESET_X, PADDLE_RESET_Y);
            paddle.state = Paddle.STATE_PAUSED;
            gameState = value;
        break;

        case STATE_GAMEOVER:
            createjs.Sound.play("dead");
            stage.addChild(gameOver);
            bricks.forEach(removeBricks);
            stage.removeChild(ball.sprite);
            stage.removeChild(paddle.sprite);
            gameState = value;
        break;

        case STATE_WIN:
            createjs.Sound.play("win");
            stage.addChild(win);
            stage.removeChild(ball.sprite);
            stage.removeChild(paddle.sprite);
            gameState = value;
        break;
    }
}

// if the ball falls off the screen, this triggers the Dead state
function setDead()
{
    setState(STATE_DEAD);
}

// method for the bricks only, they check if the ball collides with them
function monitorBrickCollisions(input: any) {

    if (boxHit(input.spriteOverlay, ball.sprite)) {
        ball.changeDirection();
        input.breakMe();
        index = bricks.indexOf(input);
        bricks.splice(index, 1);
    }

}

// removes all bricks in the case of a game over
function removeBricks(input: any) {
    input.breakMe();
}

// monitors just the paddle colliding with the ball
function monitorPaddleCollisions():void {

    if (boxHit(paddle.sprite, ball.sprite)) {
        ball.changeDirection();
        createjs.Sound.play("bounce1");
    }

}

// --------------------------------------------------- event handler
function onReady(e:createjs.Event):void {
    console.log(">> all assets loaded – ready to add sprites to game");

    // construct game objects here
    borderTop = assetManager.getSprite("sprites", "sprites/borderH", 0, 0);
    borderLeft = assetManager.getSprite("sprites", "sprites/borderV", 0, 32);
    borderRight = assetManager.getSprite("sprites", "sprites/borderV", 768, 32);

    background = assetManager.getSprite("sprites", "sprites/background", 0, 0);
    title = assetManager.getSprite("sprites", "sprites/title", 160, 100);
    death = assetManager.getSprite("sprites", "sprites/death", 160, 100);
    gameOver = assetManager.getSprite("sprites", "sprites/gameOver", 160, 100);
    pressStart = assetManager.getSprite("sprites", "sprites/pressStart", 170, 525);
    pause = assetManager.getSprite("sprites", "sprites/pause", 160, 100);
    win = assetManager.getSprite("sprites", "sprites/win", 160, 100);

    life1 = assetManager.getSprite("sprites", "sprites/paddle", 220, 420);
    life2 = assetManager.getSprite("sprites", "sprites/paddle", 357, 420);
    life3 = assetManager.getSprite("sprites", "sprites/paddle", 495, 420);    

    stage.addChild(background);
    stage.addChild(borderTop);
    stage.addChild(borderLeft);
    stage.addChild(borderRight);

    stage.addEventListener("ballDead", setDead);

    setBoard();

    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;     

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

// sets up the board
function setBoard():void{
    bricks = [];
    lives = 3;

    let y:number = 40;
    let x:number = 40;
    let z:number = 0;
    let count:number = 0;
    let count2:number = 0;

    for (let n = 0; n < 126; n++)
    {
        bricks[n] = new Brick(stage, assetManager);
        bricks[n].positionMe(x, y);
        bricks[n].setState(z);

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
    paddle.positionMe(PADDLE_RESET_X, PADDLE_RESET_Y);

    ball = new Ball(stage, assetManager);
    ball.positionMe(BALL_RESET_X, BALL_RESET_Y);

    stage.addChild(title);
}

// listens for keyboard inputs
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