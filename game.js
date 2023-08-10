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
        result = "You win! " + capitalizeFirstLetter(playerSelection) + " beats " + computerSelection.toLowerCase();
        updateScore('player');
    } else {
        result = "You lose! " + capitalizeFirstLetter(computerSelection) + " beats " + playerSelection;
        updateScore('computer');
    }
    document.getElementById("results").textContent = result;
}

let playerScore = 0;
let computerScore = 0;

function updateScore(winner) {
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    document.getElementById("score").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;

    if (playerScore === 5 || computerScore === 5) {
        const winner = playerScore === 5 ? "Player" : "Computer";
        document.getElementById("results").textContent = `${winner} wins the game!`;
        // Reset scores
        playerScore = 0;
        computerScore = 0;
        document.getElementById("score").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
    }
}

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
