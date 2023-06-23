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
const hintsDiv = document.getElementById("hintsDiv");
const definition = document.getElementById("hintDefinition");
const synonym = document.getElementById("hintSynonym");
const pos = document.getElementById("hintPoS");
const definitionDiv = document.getElementById("definitionDiv");
const synonymDiv = document.getElementById("synonymDiv");
const posDiv = document.getElementById("posDiv");
userGuess.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    check();
  }
});

let indexes = [];
let lettersTried = [];
let hintsUsed = 0;
let words;
let hintsData;
let wordDefinition;
let wordSynonym;
let wordAcronym;
// async function getHintInfo(englishWord) {
//   try {
//     const response = await fetch(
//       "https://api.dictionaryapi.dev/api/v2/entries/en/" + englishWord
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//     return;
//   }
// }

async function getWords() {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=10000"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return;
  }
}

async function fetchDataWord() {
  words = await getWords();
}

async function fetchDataHints(wordHint) {
  hintsData = await getHintInfo(wordHint);
  let data = hintsData[0];
  wordDefinition = data["meanings"][0]["definitions"][0]["definition"];
  // console.log(wordDefinition);
}

fetchDataWord();

function chooseWordNow() {
  let randomIndex = Math.floor(Math.random() * words.length);

  let randomWord = words[randomIndex];
  return randomWord;
}

let word;

// To see if hints are checked do hints.checked
// Temporary;
document.addEventListener("DOMContentLoaded", () => {
  titleSection.hidden = true;
  gameSection.hidden = false;
  hintsDiv.hidden = false;
});

function chooseWord(min, max) {
  for (let i = 0; i < words.length; i++) {
    let temp = chooseWordNow();
    if (temp.length >= min && temp.length <= max) {
      return temp;
    }
  }
}

function startGame() {
  indexes = [];
  lettersTried = [];
  hintsUsed = 0;
  if (hints.checked) {
    hintsDiv.hidden = false;
  }
  lettersUsed.innerText = "";

  const min = minLen.value;
  const max = maxLen.value;
  word = chooseWord(min, max);
  // fetchDataHints(word);
  userGuess.maxLength = word.length;
  // console.log("Word is: " + word);
  placeholderFinal.innerText = fill(placeholder.value, indexes, word);
  titleSection.hidden = true;
  gameSection.hidden = false;
}

function fill(placeholder, indexes, word) {
  final_word = "";
  for (let i = 0; i < word.length; i++) {
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
}

function check() {
  const user = userGuess.value.toLowerCase();
  if (user == word) {
    placeholderFinal.innerText = word;
  } else {
    for (let i = 0; i < word.length; i++) {
      const current = word[i];
      if (user == current) {
        indexes[indexes.length] = i;
      }
    }
    if (!word.includes(user)) {
      if (!lettersTried.includes(user)) {
        lettersTried[lettersTried.length] = user;
      }
      lettersUsed.innerText = "";
      lettersTried = lettersTried.sort();
      for (let i = 0; i < lettersTried.length; i++) {
        if (i == lettersTried.length - 1) {
          lettersUsed.innerText += " " + lettersTried[i];
        } else {
          lettersUsed.innerText += "  " + lettersTried[i] + ",";
        }
      }
    }
    placeholderFinal.innerText = fill(placeholder.value, indexes, word);
  }
  userGuess.value = "";
  if (placeholderFinal.innerText.toLowerCase() == word) {
    console.log("You won!");
  }
}

function getHint() {}

function revealLetter() {
  indexes[indexes.length] = Math.floor(Math.random() * word.length);
  console.log(indexes);
  fill(placeholder.value, indexes, word);
}
function endGame() {
  gameSection.hidden = true;
  titleSection.hidden = false;
}
