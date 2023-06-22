const titleSection = document.getElementById("titleSection");
const gameSection = document.getElementById("gameSection");
const placeholder = document.getElementById("placeholder");
const minLen = document.getElementById("minLen");
const maxLen = document.getElementById("maxLen");
const maxTries = document.getElementById("maxTries");
const hints = document.getElementById("showHints");
const placeholderFinal = document.getElementById("placeholderFinal");
const userGuess = document.getElementById("userGuess");
const checkButton = document.getElementById("checkButton");
const lettersUsed = document.getElementById("lettersUsed");
let indexes = [0, 4];

// Array of words
let words;
getWords();
function getWords() {
  fetch("https://random-word-api.herokuapp.com/word?number=100")
    .then((response) => response.json())
    .then((data) => {
      words = data[0];
      console.log(words);
    })
    .catch((error) => {
      console.error("Error:", error);
      return;
    });
}

console.log(words);

function chooseWord() {
  let randomIndex = Math.floor(Math.random() * words.length);

  let randomWord = words[randomIndex];
  return randomWord;
}

let word = "cheetah";

// To see if hints are checked do hints.checked
// Temporary;
// document.addEventListener("DOMContentLoaded", () => {
//   titleSection.hidden = true;
//   gameSection.hidden = false;
// });

function startGame() {
  console.log(words);
  word = chooseWord();
  userGuess.maxLength = word.length;
  console.log(word);
  placeholderFinal.innerText = fill(placeholder.value, indexes, word);
  titleSection.hidden = true;
  gameSection.hidden = false;
}

function fill(placeholder, indexes, word) {
  final_word = "";
  for (let i = 0; i <= word.length; i++) {
    let current = word[i];
    if (indexes.includes(i)) {
      final_word += current;
    } else {
      final_word += placeholder;
    }
  }
  return final_word;
}

function test() {
  placeholderFinal.innerText = fill(placeholder.value, indexes, word);
  console.log(word);
}
