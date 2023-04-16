const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector("#gameStatus");
const restartBtn = document.querySelector("#resetGame");
const gameWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

function startGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    gameStatus.textContent = `It is ${currentPlayer}'s turn!`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    cellChange(this, cellIndex);
    checkWinner();
}
function cellChange(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    gameStatus.textContent = `It is ${currentPlayer}'s turn!`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < gameWins.length; i++){
        const condition = gameWins[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue; 
        }
        else if (cellA == cellB && cellB == cellC){
            roundWon = true;
        }
    }

    if(roundWon){
        gameStatus.textContent = `The winner is ${currentPlayer}!`;
        running = false;
    }
    else if(!options.includes("")){
        gameStatus.textContent = `
        The game is a draw!
        `;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `It is ${currentPlayer}'s turn!`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

startGame();