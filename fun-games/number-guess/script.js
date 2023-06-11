let winningNum;
let success = false;
let tries = 0;
function randomNum(min, max) {
  let x = Math.floor(Math.random() * max + min);
  return x;
}

function getNumber() {
  const min = parseInt(document.getElementById("min-num").value);
  const max = parseInt(document.getElementById("max-num").value);

  if (isNaN(min) || isNaN(max)) {
    alert("Cannot have empty imputs");
    return;
  } else if (min > max) {
    alert("Your minimum number cannot be higher than your maximum number");
    return;
  }

  winningNum = randomNum(min, max);
  document.getElementById("random-number").innerText = winningNum;
}
function check() {
  tries += 1;
  console.log(winningNum);
  const userNum = document.getElementById("userNum").value;
  let lowerOrHigher = document.getElementById("lowerOrHigher");
  if (userNum < winningNum) {
    lowerOrHigher.innerText = "too low";
  } else if (userNum > winningNum) {
    lowerOrHigher.innerText = "too high";
  } else if (userNum == winningNum) {
    lowerOrHigher.innerText = "Correct!";
    success = true;
  }
}
