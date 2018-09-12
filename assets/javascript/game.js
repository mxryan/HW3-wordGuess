var words = [
  "hymn", "hotdog", "hamburger", "zebra", "heaven", "alpha", "omega",
  "orange", "grape", "orangutan", "elephant", "sternocloidomastoid",
  "volcano", "delta", "xenophobic", "elementary", "glycosylation",
  "glucocorticoid", "cholesterol", "steric", "arbitrary", "calves"
]

var wordArea = document.querySelector("#word-area");
var wrongGuessArea = document.querySelector("#guessed-letters");
var msgArea = document.querySelector("#message-area");
var incorrects = [];
var chosenWord, lettersRemaining;



function pickWord(arr){
  return arr[Math.floor(Math.random() * words.length)];
}

function displayBlanks(targ, num) {
  var blanks = "";
  for (var i = 0; i < num; i++){
    var blank = "<span id='blank"  + i + "'>_&nbsp</span>";
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
  if (!/[a-z]/i.test(k)){
    msgArea.textContent = "Invalid Key";
    return;
  }
  chosenWord.includes(k) ? handleCorrect(k) : handleIncorrect(k);
}

function handleIncorrect(keyName) {
  if (incorrects.includes(keyName)){
    msgArea.textContent = "You've guessed that already...";
  } else {
    incorrects.push(keyName);
    msgArea.textContent = "Wrong!";
  }
}

function handleCorrect(keyName) {
  msgArea.textContent = "Correct!";
  for (var i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i] == keyName) {
      var blankID = "#blank" + i;
      var blankSpace = document.querySelector(blankID);
      blankSpace.textContent = keyName;
      lettersRemaining--;
    }
    
  }
  if (!lettersRemaining) {
    document.removeEventListener('keypress', handleKeyPress);
    msgArea.textContent = "You win!";
  }
}


chosenWord = pickWord(words);
lettersRemaining = chosenWord.length;
displayBlanks(wordArea, chosenWord.length);

document.addEventListener('keypress', (event) => {
  handleKeyPress(event);
});

