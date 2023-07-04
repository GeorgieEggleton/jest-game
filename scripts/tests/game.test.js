/**
 * @jest-environment jsdom
 */

const { default: expect } = require("expect");
const { game } = require("../game");

//Loads index.html into jest's mock DOM
// FS libary is part of Node's default standard libary 
//Same for every HTML file, just change file name

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8"); /*file to link and chareter set (utf-8)*/
    document.open();
    document.write(fileContents);
    document.close();
});


// Tests if the game stucture exists 

describe("game object contains correct keys", () => {
    test("score key exists?", () => {
        expect("score" in game).toBe(true);     /* The variable score will be set to 0 to start with, checks score is there*/
    });
    test("currentGame key exists?", () => {
        expect("currentGame" in game).toBe(true);   /* Current game is an empty array, checks its there*/
    });
    test("playerMoves key exists?", () => {
        expect("playerMoves" in game).toBe(true);   /* PlayerMoves is an empty array, checks its there*/
    });
    test("choices key exists?", () => {
        expect("choices" in game).toBe(true);    /* choies is an empty array, checks its there*/
    });
    test("choices contains correct id's?", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);     /*Checks if the choices array now contains the correct items in the array*/
    });
});

