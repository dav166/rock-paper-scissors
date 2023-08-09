// Define the choices
const choices = ['Rock', 'Paper', 'Scissors'];

// Function to get the computer's choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    // Make the player's choice case-insensitive
    playerSelection = playerSelection.toLowerCase();

    // Compare the choices and determine the winner
    if (playerSelection === computerSelection.toLowerCase()) {
        return "It's a draw!";
    } else if (
        (playerSelection === "rock" && computerSelection === "Scissors") ||
        (playerSelection === "scissors" && computerSelection === "Paper") ||
        (playerSelection === "paper" && computerSelection === "Rock")
    ) {
        return "You win! " + playerSelection + " beats " + computerSelection;
    } else {
        return "You lose! " + computerSelection + " beats " + playerSelection;
    }
}

const playerSelection = "rock";
const computerSelection = getComputerChoice();
console.log(playRound(playerSelection, computerSelection));
            
function game() {
    let playerScore = 0;
    let computerScore = 0;

    // Play five rounds
    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt("Rock, paper, or scissors?");
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);

        // Update the score based on the result
        if (result.includes("win")) playerScore++;
        else if (result.includes("lose")) computerScore++;

        console.log(result);
    }

    // Declare the winner
    if (playerScore > computerScore) {
        console.log("You win the game!");
    } else if (playerScore < computerScore) {
        console.log("You lose the game!");
    } else {
        console.log("The game is a draw!");
    }
}