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
    playerScore = 0;
    computerScore = 0;
    const postGameContainer = document.getElementById("postGameContainer") || createPostGameOptions();

    postGameContainer.innerHTML = '';

    let postGameMessage = document.createElement("p");
    postGameMessage.textContent = playerScore > computerScore ? "Congratulations! You won!" : "Better luck next time!";
    postGameContainer.appendChild(postGameMessage);

    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.addEventListener("click", function() {
        startGame(targetScore); // Restart the game with the same game type
    });
    postGameContainer.appendChild(playAgainButton);

    const quitButton = document.createElement("button");
    quitButton.textContent = "Quit";
    quitButton.addEventListener("click", function() {
        window.close();
    });
    postGameContainer.appendChild(quitButton);

    // Hide the game screen and show the start screen
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
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