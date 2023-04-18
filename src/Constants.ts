// game constants
export const STAGE_WIDTH:number = 800;
export const STAGE_HEIGHT:number = 568;
export const FRAME_RATE:number = 30;
export const BALL_RESET_X:number = 390;
export const BALL_RESET_Y:number = 475;
export const PADDLE_RESET_X:number = 357;
export const PADDLE_RESET_Y:number = 500;

export const ASSET_MANIFEST:Object[] = [
    {
        type:"json",
        src:"./lib/spritesheets/sprites.json",
        id:"sprites",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/sprites.png",
        id:"sprites",
        data:0
    },
    {
        type: "sound",
        src: "./lib/sounds/bounce.wav",
        id:"bounce",
        data:1
    },
    {
        type: "sound",
        src: "./lib/sounds/bounce1.wav",
        id:"bounce1",
        data:1
    },
    {
        type: "sound",
        src: "./lib/sounds/brickBreak.wav",
        id:"brickBreak",
        data:1
    },
    {
        type: "sound",
        src: "./lib/sounds/dead.wav",
        id:"dead",
        data:1
    },
    {
        type: "sound",
        src: "./lib/sounds/win.wav",
        id:"win",
        data:1
    }

];