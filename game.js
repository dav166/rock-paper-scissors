let targetScore = 0; // Set default values
let playerScore = 0;
let computerScore = 0;

function startGame(gameType) {
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
}

// Define the choices
const choices = ['Rock', 'Paper', 'Scissors'];

// Function to get the computer's choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function playRound(playerSelection) {
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
}

function updateScore(winner) {
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
}

document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners to buttons
    document.getElementById("rock").addEventListener("click", function() {
        playRound("rock");
    });
    document.getElementById("paper").addEventListener("click", function() {
        playRound("paper");
    });
    document.getElementById("scissors").addEventListener("click", function() {
        playRound("scissors");
    });
});

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    targetScore = 0;

    // Update the displayed scores
    document.getElementById("score").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;

    // Hide the main game screen
    document.getElementById("gameScreen").style.display = "none";

    // Show the start screen
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
    postGameMessage.textContent = "Would you like to play again? Choose a game type or quit.";
    postGameContainer.appendChild(postGameMessage);

    let quitButton = document.createElement("button");
    quitButton.textContent = "Quit";
    quitButton.addEventListener("click", function() {
        window.close();
    });
    postGameContainer.appendChild(quitButton);
}