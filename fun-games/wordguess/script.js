const titleSection = document.getElementById("titleSection");
const gameSection = document.getElementById("gameSection");
const placeholder = document.getElementById("placeholder");
const minLen = document.getElementById("minLen");
const maxLen = document.getElementById("maxLen");
const maxTries = document.getElementById("maxTries");
const hints = document.getElementById("showHints");
const placeholderFinal = document.getElementById("placeholderFinal");

let indexes = [0, 4];

// Array of words
let words = ["apple", "banana", "orange", "grape", "melon"];

function chooseWord() {
  let randomIndex = Math.floor(Math.random() * words.length);

  let randomWord = words[randomIndex];
  return randomWord;
}

let word = "cheetah";

// To see if hints are checked do hints.checked
// Temporary;
document.addEventListener("DOMContentLoaded", () => {
  titleSection.hidden = true;
  gameSection.hidden = false;
});

function startGame() {
  word = chooseWord();
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
