// Constants and Variables
const choices = ['Rock', 'Paper', 'Scissors'];
let targetScore = 0; 
let playerScore = 0;
let computerScore = 0;

// Utility functions
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

// Game functions
const getComputerChoice = () => choices[Math.floor(Math.random() * 3)];

const playRound = (playerSelection) => {
    const computerSelection = getComputerChoice();
    // Make the player's choice case-insensitive
    playerSelection = playerSelection.toLowerCase();

    let result;
    // Compare the choices and determine the winner
    if (playerSelection === computerSelection.toLowerCase()) {
        result = "It's a draw!";
    } else if (
        (playerSelection === "rock" && computerSelection === "Scissors") ||
        (playerSelection === "scissors" && computerSelection === "Paper") ||
        (playerSelection === "paper" && computerSelection === "Rock")
    ) {
        result = "You win! " + capitalizeFirstLetter(playerSelection) + " beats " + computerSelection.toLowerCase() + ".";
        updateScore('player');
    } else {
        result = "You lose! " + capitalizeFirstLetter(computerSelection) + " beats " + playerSelection + ".";
        updateScore('computer');
    }
    document.getElementById("results").textContent = result;
};

const updateScore = (winner) => {
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    document.getElementById("score").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;

    // Check if either player or computer has reached the target score
    if (playerScore === targetScore || computerScore === targetScore) {
        const winner = playerScore === targetScore ? "Congratulations! You win" : "Oh no! The computer wins";
        document.getElementById("results").textContent = `${winner} the game!`;
        resetGame();
    }
    console.log("Updating score. Player:", playerScore, "Computer:", computerScore);
};

const startGame = (gameType) => {
    // Reset scores
    playerScore = 0;
    computerScore = 0;
    document.getElementById("score").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("gameType").textContent = `First to ${gameType}`;

    // Set the target score based on game type
    if (gameType === 3) {
        targetScore = 3;
    } else if (gameType === 5) {
        targetScore = 5;
    }
    console.log("Game started with target score:", targetScore);
};

const resetGame = () => {
    // Update the displayed scores
    document.getElementById("score").textContent = `Final Score - Player: ${playerScore} | Computer: ${computerScore}`;

    // Hide the main game screen
    document.getElementById("gameScreen").style.display = "none";

    // Show the start screen with post-game options
    document.getElementById("startScreen").style.display = "block";

    let postGameContainer = document.getElementById("postGameContainer");

    if (!postGameContainer) {
        postGameContainer = document.createElement("div");
        postGameContainer.id = "postGameContainer";
        document.getElementById("startScreen").appendChild(postGameContainer)
    } else {
        postGameContainer.innerHTML = ''; // Clear previous content
    }

    let postGameMessage= document.createElement("p");
    if (playerScore > computerScore) {
        postGameMessage.textContent = "Congratulations! You won!";
    } else {
        postGameMessage.textContent = "Better luck next time!";
    }
    postGameContainer.appendChild(postGameMessage);

    let playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.addEventListener("click", function() {
        playerScore = 0;
        computerScore = 0;
        targetScore = 0;
        postGameContainer.remove(); // Remove the post-game container
        document.getElementById("score").textContent = `Player: ${playerScore} | Computer: $(computerScore)`;
    });
    postGameContainer.appendChild(playAgainButton);

    let quitButton = document.createElement("button");
    quitButton.textContent = "Quit";
    quitButton.addEventListener("click", function() {
        window.close();
    });
    postGameContainer.appendChild(quitButton);
};

document.addEventListener("DOMContentLoaded", function() {
    const rockButton = document.getElementById("rock");
    const paperButton = document.getElementById("paper");
    const scissorsButton = document.getElementById("scissors");
    const gameTypeButtons = document.querySelectorAll("[data-game-type");

    rockButton.addEventListener("click", () => playRound("rock"));
    paperButton.addEventListener("click", () => playRound("paper"));
    scissorsButton.addEventListener("click", () => playRound("scissors"));
    gameTypeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const gameType = parseInt(this.getAttribute("data-game-type"));
            startGame(gameType);
        });
    });
});