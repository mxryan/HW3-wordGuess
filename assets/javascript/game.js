var words = [
  "hymn", "hotdog", "hamburger", "zebra", "heaven", "alpha", "omega",
  "orange", "grape", "orangutan", "elephant", "sternocloidomastoid",
  "volcano", "delta", "xenophobic", "elementary", "glycosylation",
  "glucocorticoid", "cholesterol", "steric", "arbitrary", "calves"
]

var wordArea = document.querySelector("#word-area");
var wrongGuessArea = document.querySelector("#guessed-letters");
var msgArea = document.querySelector("#message-area");
var guessRemaingArea = document.querySelector("#guesses-remaining");
var newGameBtn = document.querySelector("#new-game");
var incorrects = [];
var corrects = [];
var chosenWord, lettersRemaining;
var guessesRemaining;


function pickWord(arr) {
  return arr[Math.floor(Math.random() * words.length)];
}

function displayBlanks(targ, num) {
  var blanks = "";
  for (var i = 0; i < num; i++) {
    var blank = "<span class='blankspace' id='blank" + i + "'>_&nbsp</span>";
    blanks += blank;
  }
  targ.innerHTML = blanks;
}

function handleKeyPress(event) {
  var k = event.key.toLowerCase();
  if (!lettersRemaining) {
    msgArea.textContent = "You've already won! Start a new game?";
    return;
  }
  if (!/[a-z]/i.test(k)) {
    msgArea.textContent = "Invalid Key";
    return;
  }
  chosenWord.includes(k) ? handleCorrect(k) : handleIncorrect(k);
}

function handleIncorrect(keyName) {
  if (incorrects.includes(keyName)) {
    msgArea.textContent = "You've guessed that already...";
  } else {
    incorrects.push(keyName);
    wrongGuessArea.textContent = incorrects.join(" ");
    msgArea.textContent = "Wrong!";
    guessesRemaining--;
    if (guessesRemaining === 0) {
      msgArea.textContent = "Game over :(";
      document.onkeypress = null;
    }
    guessRemaingArea.textContent = guessesRemaining;
  }
}

function handleCorrect(keyName) {
  msgArea.textContent = "Correct!";
  for (var i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i] == keyName) {
      if (corrects.includes(i)) {
        msgArea.textContent = "You guessed that already!";
        return;
      }
      var blankID = "#blank" + i;
      var blankSpace = document.querySelector(blankID);
      blankSpace.textContent = keyName;
      lettersRemaining--;
      corrects.push(i);
    }

  }
  if (!lettersRemaining) {
    document.removeEventListener('keypress', handleKeyPress);
    msgArea.textContent = "You win!";
  }
}

function newGame() {
  chosenWord = pickWord(words);
  lettersRemaining = chosenWord.length;
  displayBlanks(wordArea, chosenWord.length);
  guessesRemaining = 10;
  guessRemaingArea.textContent = guessesRemaining;
  incorrects = [];
  corrects = [];
  msgArea.textContent = "You've started a new game!";
  guessRemaingArea.textContent = "";
  wrongGuessArea.textContent = "";
  document.onkeypress = (event) => {
    handleKeyPress(event);
  }
}

newGameBtn.onclick = () => {
  newGame();
}

