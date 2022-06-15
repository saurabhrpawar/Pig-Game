'use strict';

// Reused elements
const mainBody = document.querySelector('.main-body');
const btnNewEl = document.querySelector('.new');
const btnRollEl = document.querySelector('.roll');
const btnHoldEl = document.querySelector('.hold');
const player1El = document.querySelector('.player-1');
const player2El = document.querySelector('.player-2');
const score1El = document.querySelector('.total-1');
const score2El = document.querySelector('.total-2');
const currentScore1El = document.querySelector('#current-1');
const currentScore2El = document.querySelector('#current-2');
const diceEl = document.getElementById('dice');
const finish = document.getElementById('finish');

let currentScore, activePlayer, currentPlayer, scores;

// Function to reset game
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 'active-1';
    currentPlayer = 'current-1';
    mainBody.id = 'active-1';
    score1El.textContent = 0;
    score2El.textContent = 0;
    currentScore1El.textContent = 0;
    currentScore2El.textContent = 0;
    player1El.textContent = 'Player 1';
    player2El.textContent = 'Player 2';
    btnRollEl.classList.remove('hidden');
    btnHoldEl.classList.remove('hidden');
    diceEl.classList.add('hidden');
    finish.classList.add('hidden');
    player1El.classList.add('border');
    player2El.classList.remove('border');
}

// Reseting everything to zero and starting the new game whenever page loads
init();

// Function to change player
const changePlayer = function () {
    currentScore = 0;
    document.querySelector(`#${currentPlayer}`).textContent = 0;
    currentPlayer = currentPlayer === 'current-1' ? 'current-2' : 'current-1';
    mainBody.id = mainBody.id === 'active-1' ? 'active-2' : 'active-1';
    player1El.classList.toggle('border');
    player2El.classList.toggle('border');
}

// Roll a dice (Functionality)
btnRollEl.addEventListener('click', function () {
    // Creating random number between 1-6 for dice
    const random = Math.trunc(Math.random() * 6) + 1;

    // Checking if it is 1
    if (random !== 1) {

        // Showing dice on screen
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${random}.png`;

        // Storing current score
        currentScore += random;

        // Showing current score on screen
        document.querySelector(`#${currentPlayer}`).textContent = currentScore;
    } else {
        // If it is 1 then...
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${random}.png`;

        // Changing the player 
        changePlayer();
    }
});

// Hold the current score (Functionality)
btnHoldEl.addEventListener('click', function () {

    // Check current player
    if (currentPlayer === 'current-1') {

        // Adding current score to total score
        scores[0] += currentScore;

        // Setting others to zero again
        currentScore = 0;
        score1El.textContent = scores[0];

        // Checking if total score is >= 100
        if (scores[0] < 100) {

            // If it is not >= 100, change the player 
            changePlayer();
        } else {

            // Else decide the result
            currentScore1El.textContent = 0;
            player1El.textContent = 'Winner!';
            player2El.textContent = 'Looser!';
            btnRollEl.classList.add('hidden');
            btnHoldEl.classList.add('hidden');
            diceEl.classList.add('hidden');
            finish.classList.remove('hidden');
            diceEl.textContent = 'Start Again!';
        }

    } else {

        // Same things as player1 if it if current player is playeer2 
        scores[1] += currentScore;
        currentScore = 0;
        score2El.textContent = scores[1];
        if (scores[1] < 100) {
            changePlayer();
        } else {
            currentScore2El.textContent = 0;
            player2El.textContent = 'Winner!';
            player1El.textContent = 'Looser!';
            btnRollEl.classList.add('hidden');
            btnHoldEl.classList.add('hidden');
            diceEl.classList.add('hidden');
            finish.classList.remove('hidden');
            diceEl.textContent = 'Start Again!';
        }
    }
});

// Reset the game and start new game (Functionality)
btnNewEl.addEventListener('click', function () {

    // Setting every score to zero and making everything as the new game has
    init();
});

// Will ipmrove code later when I understand the new concept!