/**
 * @jest-environment jsdom
 */


const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");




jest.spyOn(window, "alert").mockImplementation(() => { });    

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
    test("turnNumber key exists?", () => {
        expect("turnNumber" in game).toBe(true);     /*Checks if the choices array now contains the correct items in the array*/
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key value is false", () => {
        expect("turnInProgress" in game).toBe(true);
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
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });

   
    /*
   This test now removed as we now are adding to the arrey so no longer need to test to see if it is empty, as it won't be


    test("should clear array of moves in the currentGame arrey created by the computer", () => {
        expect(game.currentGame.length).toBe(0);         need .length as above & toBe as it is an arrey not a number "legth to be 0" 
    });

    */
    
    test("There should be one move in the array of moves in the currentGame arrey created by the computer", () => {
        expect(game.currentGame.length).toBe(1);         /* Updated test from commented out one above, now testing that there IS something in the array */
    });

    test("should display 0 for the element with the ID of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);       /* finds the div with id score and checks if the inner text is reset to 0 */
    });
});

describe("GamePlay works correctly", () => {
    beforeEach(() => {                              /* Before each runs before each test in run unlike beforeAll which runs before before all the tests*/
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("Does addTurn adds a new turn to the game?", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    }); 
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", ()=> {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should call an alert if player makes wrong move", () => {             /*Needs the jestHoist.spyOn(window,"alert").mockImplementation(() => {}); listed at the top */
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("wrong move!");
    });
    test("should toggle turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("clicking during computer sequince should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});

