//const { array } = require("yargs");

let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    turnNumber: 0,
    lastButton: [],
    turnInProgress: false,
}


function newGame(){
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress){
                let move = e.target.getAttribute("id");
                game.lastButton = move;
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
            }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

function addTurn(){
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]); /*Math.floor for whole number - math.random*4random number between 0 & 3 (there are 4 items in our choices arrey)*/
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText=game.score;
}


function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurns(){
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if(game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}


function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("wrong move!");
        newGame();
    }
}
module.exports =  { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };