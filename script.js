"use strict";

const boxes = document.querySelectorAll(".box");
const showPlayerOneScore = document.querySelector(".player-one .score");
const showPlayerTwoScore = document.querySelector(".player-two .score");
const showPlayer = document.querySelector(".player");
const winner = document.querySelector(".winner");

const players = [];

const player = function (name, control, score, moves) {
  return { name, control, score, moves };
};

const playerOne = new player("player-one", "x", 0, 0);
players.push(playerOne);
const playerTwo = new player("player-two", "o", 0, 0);
players.push(playerTwo);

const winningArrays = [
  [0, 3, 6],
  [0, 1, 2],
  [0, 4, 8],
  [2, 5, 8],
  [6, 7, 8],
  [1, 4, 7],
  [3, 4, 5],
  [2, 4, 6],
];

let steps = 0;
let currentPlayer = 0;
showPlayer.textContent = players[currentPlayer].name;

const checkWinner = () => {
  winningArrays.forEach((array) => {
    let square1 = boxes[array[0]];
    let square2 = boxes[array[1]];
    let square3 = boxes[array[2]];

    if (
      square1.classList.contains("player-one") &&
      square2.classList.contains("player-one") &&
      square3.classList.contains("player-one")
    ) {
      winner.textContent = "Player One Wins";
      playerOne.score++;
      showPlayerOneScore.textContent = playerOne.score;
      setTimeout(resetGame, 1000);
    } else if (
      square1.classList.contains("player-two") &&
      square2.classList.contains("player-two") &&
      square3.classList.contains("player-two")
    ) {
      winner.textContent = "Player two Wins";
      playerTwo.score++;
      showPlayerTwoScore.textContent = playerTwo.score;
      setTimeout(resetGame, 1000);
    }
  });
};

const resetGame = () => {
  boxes.forEach((box) => {
    box.classList.remove("selected");
    if (box.classList.contains("player-one")) {
      box.classList.remove("player-one", "control-x");
    }
    if (box.classList.contains("player-two")) {
      box.classList.remove("player-two", "control-o");
    }
  });

  winner.textContent = "";
  steps = 0;
};

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (e.target.classList.contains("selected")) {
      alert("cant go here");
    } else {
      if (currentPlayer == 0) {
        e.target.classList.add(
          "selected",
          `${playerOne.name}`,
          `control-${playerOne.control}`
        );
        playerOne.moves++;
        if (playerOne.moves >= 3) {
          checkWinner();
        }
        currentPlayer = 1;
        showPlayer.textContent = players[currentPlayer].name;
      } else if (currentPlayer == 1) {
        e.target.classList.add(
          "selected",
          `${playerTwo.name}`,
          `control-${playerTwo.control}`
        );
        playerTwo.moves++;
        if (playerTwo.moves >= 3) {
          checkWinner();
        }
        currentPlayer = 0;
        showPlayer.textContent = players[currentPlayer].name;
      }
      steps++;

      if (steps === 9) {
        resetGame();
      }
    }
  });
});
