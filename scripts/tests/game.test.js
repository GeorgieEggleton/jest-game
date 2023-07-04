/**
 * @jest-environment jsdom
 */

const { default: expect } = require("expect");
const { game, newGame, showScore } = require("../game");

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


describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;                              /* Might be a random value to start with? Fake data to check if its cleared*/
        game.playerMoves = ["button1", "button2"];   /* I think this puts in a starting piece of info so that there is something to be reset... but that may be wrong*/
        game.currentGame = ["button1", "button2"];   /* As above*/
        document.getElementById("score").innerTest = "42";    /*Sets the displayed score to 42*/
        
        newGame();                                          /*Calls the newGame function to see if the tests work*/
    });
    test("should set game score to 0", () => {
        expect(game.score).toEqual(0);
    });
    test("should clear playerMoves array", () => {
        expect(game.playerMoves.length).toBe(0);        /* need .length as it is an arrey this time not an interger as last one*/
    });
    test("should clear array of moves in the currentGame arrey created by the computer", () => {
        expect(game.currentGame.length).toBe(0);        /* need .length as above & toBe as it is an arrey not a number "legth to be 0" */
    });
    test("should display 0 for the element with the ID of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);       /* finds the div with id score and checks if the inner text is reset to 0 */
    });
});
