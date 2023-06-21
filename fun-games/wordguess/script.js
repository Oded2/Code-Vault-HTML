const titleSection = document.getElementById("titleSection");
const gameSection = document.getElementById("gameSection");
const placeholder = document.getElementById("placeholder");
const minLen = document.getElementById("minLen");
const maxLen = document.getElementById("maxLen");
const maxTries = document.getElementById("maxTries");
const hints = document.getElementById("showHints");

// To see if hints are checked do hints.checked
// Temporary
// document.addEventListener("DOMContentLoaded", () => {
//     titleSection.hidden = true;
//     gameSection.hidden = false;
// });

function startGame() {
  titleSection.hidden = true;
  gameSection.hidden = false;
}
