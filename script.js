const boxes = document.querySelectorAll('.box');
const showPlayerOneScore = document.querySelector('.player-one .score');
const showPlayerTwoScore = document.querySelector('.player-two .score');
const showPlayer = document.querySelector('.player');
const winner = document.querySelector('.winner');


let playerOneMoves = 0;
let playerOneScore = 0;
let playerTwoMoves = 0;
let playerTwoScore = 0;

const winningArrays = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 5, 8],
];

let steps = 0;
let currentPlayer = 1;
showPlayer.textContent = currentPlayer;

boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        if (e.target.classList.contains('selected')) {
            alert('cant go here');
        } else {
            if (currentPlayer == 1) {
                e.target.classList.add('selected', 'player-one', 'control-x');
                playerOneMoves++;
                if (playerOneMoves >= 3) {
                    checkWinner();
                }
                currentPlayer = 2;
                showPlayer.textContent = currentPlayer;
            } else if (currentPlayer == 2) {
                e.target.classList.add('selected', 'player-two', 'control-o');
                playerTwoMoves++;
                if (playerTwoMoves >= 3) {
                    checkWinner();
                }
                currentPlayer = 1;
                showPlayer.textContent = currentPlayer;
            }
            steps++;
            if (steps >= 3) {
                checkWinner();
            }
        }
    })
})

checkWinner = () => {
    for (let x = 0; x < winningArrays.length; x++) {
        let square1 = boxes[winningArrays[x][0]];
        let square2 = boxes[winningArrays[x][1]];
        let square3 = boxes[winningArrays[x][2]];

        if (
            square1.classList.contains('player-one') &&
            square2.classList.contains('player-one') &&
            square3.classList.contains('player-one')
        ) {
            winner.textContent = 'Player One Wins';
            playerOneScore++;
            showPlayerOneScore.textContent = playerOneScore;
            setTimeout(resetGame, 1000);
        }
        if (
            square1.classList.contains('player-two') &&
            square2.classList.contains('player-two') &&
            square3.classList.contains('player-two')
        ) {
            winner.textContent = 'Player two Wins';
            playerTwoScore++;
            showPlayerTwoScore.textContent = playerTwoScore;
            setTimeout(resetGame, 1000);
        }
    }
}

resetGame = () => {
    boxes.forEach(box => {
        box.classList.remove('selected');
        if (box.classList.contains('player-one')) {
            box.classList.remove('player-one', 'control-x');
        }
        if (box.classList.contains('player-two')) {
            box.classList.remove('player-two', 'control-o');
        }
    })
}

