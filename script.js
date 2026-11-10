// Game state variables
let targetNumber;
let attempts = 0;
let previousGuesses = [];
let gameOver = false;


// DOM Elements
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const messageEl = document.getElementById('message');
const attemptsEl = document.getElementById('attempts');
const prevGuessesEl = document.getElementById('prevGuesses');
const resetBtn = document.getElementById('resetBtn');


// Initialize game
function initGame() {
 targetNumber = Math.floor(Math.random() * 100) + 1;
 attempts = 0;
 previousGuesses = [];
 gameOver = false;


 attemptsEl.textContent = '0';
 prevGuessesEl.textContent = '-';
 messageEl.textContent = '\u00A0';
 messageEl.className = 'message';
  guessInput.value = '';
 guessInput.disabled = false;
 guessBtn.disabled = false;
 resetBtn.classList.add('hidden');
 guessInput.focus();
}


// Process guess logic
function checkGuess() {
 if (gameOver) return;


 const userGuess = parseInt(guessInput.value);


 if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
   messageEl.textContent = 'Please enter a valid number (1-100)';
   messageEl.className = 'message high';
   return;
 }


 attempts++;
 previousGuesses.push(userGuess);


 attemptsEl.textContent = attempts;
 prevGuessesEl.textContent = previousGuesses.join(', ');


 if (userGuess === targetNumber) {
   messageEl.textContent = `🎉 Correct! You guessed it in ${attempts} attempts!`;
   messageEl.className = 'message correct';
   endGame();
 } else if (userGuess < targetNumber) {
   messageEl.textContent = '📉 Too low! Try a higher number.';
   messageEl.className = 'message low';
 } else {
   messageEl.textContent = '📈 Too high! Try a lower number.';
   messageEl.className = 'message high';
 }


 guessInput.value = '';
 guessInput.focus();
}


// Disable input when game finishes
function endGame() {
 gameOver = true;
 guessInput.disabled = true;
 guessBtn.disabled = true;
 resetBtn.classList.remove('hidden');
}


// Event Listeners
guessBtn.addEventListener('click', checkGuess);


guessInput.addEventListener('keydown', (e) => {
 if (e.key === 'Enter') {
   checkGuess();
 }
});


resetBtn.addEventListener('click', initGame);


// Start game on load
initGame();
