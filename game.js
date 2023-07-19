
    //  Your game is going to play against the computer, so begin with a function called getComputerChoice that will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’. We’ll use this function in the game to make the computer’s play. 
        //  Tip: use the console to make sure this is returning the expected output before moving to the next step!
const choices = ['Rock', 'Paper', 'Scissors'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}
    //  Write a function that plays a single round of Rock Paper Scissors. The function should take two parameters - the playerSelection and computerSelection - and then return a string that declares the winner of the round like so: "You Lose! Paper beats Rock"
        //  - Make your function’s playerSelection parameter case-insensitive (so users can input rock, ROCK, RocK or any other variation).
        // Important note: you want to return the results of this function call, not console.log() them. You’re going to use what you return later on, so let’s test this function by using console.log to see the results:

function playRound(playerSelection, computerSelection) {
    // Make the player's choice case-insensitive
    playerSelection = playerSelection.toLowerCase();

    // Compare choices and determine the winner
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
            
    //  Write a NEW function called game(). Use the previous function inside of this one to play a 5 round game that keeps score and reports a winner or loser at the end.

        //  - You have not officially learned how to “loop” over code to repeat function calls… if you already know about loops from somewhere else (or if you feel like doing some more learning) feel free to use them. If not, don’t worry! Just call your playRound function 5 times in a row. Loops are covered in the next lesson.        
        //  - At this point you should be using console.log() to display the results of each round and the winner at the end.
        //  - Use prompt() to get input from the user. Read the docs here if you need to.
        //  - Feel free to re-work your previous functions if you need to. Specifically, you might want to change the return value to something more useful.
        //  - Feel free to create more “helper” functions if you think it would be useful.

function game() {
    let playerScore = 0;
    let computerScore = 0;

    // Play 5 rounds
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