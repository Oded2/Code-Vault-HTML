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
const placeholderDiv = document.getElementById("placeholderDiv");
const triesLeft = document.getElementById("triesLeft");
const triesLeftNum = document.getElementById("triesLeftNum");
userGuess.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    check();
  }
});
let attempts = 0;
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

// Temporary;
// document.addEventListener("DOMContentLoaded", () => {
//   titleSection.hidden = true;
//   gameSection.hidden = false;
//   hintsDiv.hidden = false;
// });

function chooseWord(min, max) {
  let temp;
  for (let i = 0; i < words.length; i++) {
    temp = chooseWordNow();
    if (temp.length >= min && temp.length <= max) {
      return temp;
    }
  }
  alert(
    "Could not find a word within your minimum and maximum range; you will be selected a random word instead."
  );
  return temp;
}
function updateTries() {
  if (maxTries.value - attempts >= 0) {
    triesLeft.value = maxTries.value - attempts;
    triesLeftNum.innerText = maxTries.value - attempts;
  }
}
function startGame() {
  userGuess.value = "";

  triesLeft.max = maxTries.value;
  updateTries();
  attempts = 0;
  indexes = [];
  lettersTried = [];
  hintsUsed = 0;
  borderRemove();
  if (hints.checked) {
    hintsDiv.hidden = false;
  } else {
    hintsDiv.hidden = true;
  }
  lettersUsed.innerText = "";
  let min;
  let max;
  if (minLen.value == "") {
    min = 0;
  } else {
    min = minLen.value;
  }
  if (maxLen.value == "") {
    max = 999;
  } else {
    max = maxLen.value;
  }

  word = chooseWord(min, max);
  // fetchDataHints(word);
  userGuess.maxLength = word.length;
  fill();
  titleSection.hidden = true;
  gameSection.hidden = false;
}

function fill() {
  final_word = "";
  for (let i = 0; i < word.length; i++) {
    let current = word[i];
    if (indexes.includes(i)) {
      final_word += current;
    } else {
      final_word += placeholder.value;
    }
  }

  placeholderFinal.innerText = final_word;
}

function check() {
  const user = userGuess.value.toLowerCase();
  if (user != "" && !lettersTried.includes(user) && !word.includes(user)) {
    attempts++;
  }

  if (user == word) {
    placeholderFinal.innerText = word;
  } else {
    for (let i = 0; i < word.length; i++) {
      const current = word[i];
      if (user == current && !indexes.includes(i)) {
        indexes[indexes.length] = i;
      }
    }
    if (!word.includes(user)) {
      if (!lettersTried.includes(user) && user.length == 1) {
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
    updateTries();
    fill();
  }
  userGuess.value = "";
  isWin();
}

function isWin() {
  if (indexes.length == word.length && attempts <= maxTries.value) {
    if (placeholderDiv.classList.contains("border-info")) {
      placeholderDiv.classList.remove("border-info");
    }
    placeholderDiv.classList.add("border-success");
  } else if (attempts >= maxTries.value) {
    placeholderFinal.innerText = word;
    if (placeholderDiv.classList.contains("border-info")) {
      placeholderDiv.classList.remove("border-info");
    }
    placeholderDiv.classList.add("border-danger");
  }
}

function borderRemove() {
  if (placeholderDiv.classList.contains("border-success")) {
    placeholderDiv.classList.remove("border-success");
    placeholderDiv.classList.add("border-info");
  } else if (placeholderDiv.classList.contains("border-danger")) {
    placeholderDiv.classList.remove("border-danger");
    placeholderDiv.classList.add("border-info");
  }
}

// function getHint() {}

function revealLetter() {
  let r;
  let runs = 0;
  while (true) {
    runs++;
    r = Math.floor(Math.random() * word.length);
    if (!indexes.includes(r) || runs >= 100) {
      break;
    }
  }
  indexes[indexes.length] = r;

  fill();
  isWin();
}
function endGame() {
  gameSection.hidden = true;
  titleSection.hidden = false;
}
