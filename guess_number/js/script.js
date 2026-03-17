// event listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
document.querySelector("#playButton").addEventListener("click", startGame);

// global variables
let randomNumber;
let attempts = 0;
// keep track of wins and losses
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;

    // hiding the reset button
    document.querySelector("#resetBtn").style.display = "none";

    // showing the guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); // adding focus to textbox
    playerGuess.value = ""; // clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; // clearing the feedback

    // clearing previous guesses
    document.querySelector("#guesses").textContent = "";

    // reset attempts left
    document.querySelector("#attemptsLeft").textContent = 7;
}   

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    // show attempts left
    document.querySelector("#attemptsLeft").textContent = 7 - attempts;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        // track wins and losses
        wins++;
        document.querySelector("#wins").textContent = wins;
        feedback.textContent = "You guessed it! You won!";
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6}
        });
        feedback.style.color = "darkgreen";
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            // track wins and losses
            losses++;
            document.querySelector("#losses").textContent = losses;
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber + ".";
            feedback.style.color = "red";
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    // hide guess button
    document.querySelector("#guessBtn").style.display = "none";

    // show reset button
    document.querySelector("#resetBtn").style.display = "inline";
}

function startGame() {
    document.querySelector("#splash").style.display = "none";
    document.querySelector("#game").style.display = "flex";
}

const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});