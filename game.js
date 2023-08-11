// --- Constants and Initialization --- //
const choices = ['Rock', 'Paper', 'Scissors'];
let targetScore = 0; 
let playerScore = 0;
let computerScore = 0;

// --- Utility Functions --- //
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const getComputerChoice = () => choices[Math.floor(Math.random() * 3)];

const setTargetScore = gameType => gameType === 3 ? 3 : 5;

// --- Core Game Logic --- //
const playRound = playerSelection => {
    const computerSelection = getComputerChoice();
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
        result = `You win! ${capitalizeFirstLetter(playerSelection)} beats ${computerSelection.toLowerCase()}.`;
        updateScore('player');
    } else {
        result = `You lose! ${capitalizeFirstLetter(computerSelection)} beats ${playerSelection}`;
        updateScore('computer');
    }
    document.getElementById("results").textContent = result;
};

const updateScore = winner => {
    winner === 'player' ? playerScore++ : computerScore++;
    console.log("Current scores - Player:", playerScore, "Computer:", computerScore, "Target:", targetScore);
    document.getElementById("score").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;

    if (playerScore === targetScore || computerScore === targetScore) {
        document.getElementById("results").textContent = playerScore === targetScore ? "Congratulations! You win the game!" : "Oh no! The computer wins!";
        resetGame();
    }
};

const startGame = gameType => {
    [playerScore, computerScore, targetScore] = [0, 0, setTargetScore(gameType)];
    console.log("Starting game with target score:", targetScore);

    document.getElementById("score").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("gameType").textContent = `First to ${gameType}`;
};

const resetGame = () => {
    const gameScreen = document.getElementById("gameScreen");
    const endGameScreen = document.createElement("div");
    endGameScreen.id = "endGameScreen";
    document.body.appendChild(endGameScreen);

    // Announce the winner
    const winnerMessage = document.createElement("p");
    winnerMessage.textContent = playerScore === targetScore ? "Congratulations! You won!" : "Better luck next time!";
    endGameScreen.appendChild(winnerMessage);

    // Play Again button
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.addEventListener("click", function() {
        endGameScreen.remove(); // Remove the end-game screen

        // Reset game state and UI elements
        [playerScore, computerScore, targetScore] = [0, 0, 0];
        document.getElementById("results").textContent = ""; // Clear the result message
        document.getElementById("score").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
        document.getElementById("startScreen").style.display = "block"; // Display the start screen
    });
    endGameScreen.appendChild(playAgainButton);

    // Quit button
    const quitButton = document.createElement("button");
    quitButton.textContent = "Quit";
    quitButton.addEventListener("click", function() {
        window.close();
    });
    endGameScreen.appendChild(quitButton);

    gameScreen.style.display = "none"; // Hide the main game screen
};

const createPostGameOptions = () => {
    let postGameContainer = document.getElementById("postGameContainer");

    // If the postGameContainer doesn't exist, create it
    if (!postGameContainer) {
        postGameContainer = document.createElement("div");
        postGameContainer.id = "postGameContainer";
        document.getElementById("startScreen").appendChild(postGameContainer);
    } else {
        // If it does exist, clear its contents
        postGameContainer.innerHTML = '';
    }
    
    return postGameContainer;
};

// --- Event Listeners --- //
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("rock").addEventListener("click", () => playRound("rock"));
    document.getElementById("paper").addEventListener("click", () => playRound("paper"));
    document.getElementById("scissors").addEventListener("click", () => playRound("scissors"));

    document.querySelectorAll("[data-game-type]").forEach(button => {
        button.addEventListener("click", function() {
            const gameType = parseInt(this.getAttribute("data-game-type"));
            startGame(gameType);
        });
    });
});