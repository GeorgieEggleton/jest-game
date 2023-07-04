const { array } = require("yargs");

let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
}


function newGame(){
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    showScore();
    addTurn();
}

function addTurn(){
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]); /*Math.floor for whole number - math.random*4random number between 0 & 3 (there are 4 items in our choices arrey)*/
    // showTurns();
}

function showScore() {
    document.getElementById("score").innerText=game.score;
}





module.exports =  { game, newGame, showScore, addTurn };