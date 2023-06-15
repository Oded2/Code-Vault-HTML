let winningNum;
let tries = 0;
let actualTries = 0;
let attemptedNums = [];
function randomNum(min, max) {
  let x = Math.floor(Math.random() * max + min);
  return x;
}
document
  .getElementById("userNum")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      check();
    }
  });
function getNumber() {
  const min = parseInt(document.getElementById("min-num").value);
  const max = parseInt(document.getElementById("max-num").value);

  if (isNaN(min) || isNaN(max)) {
    alert("Input must have numbers");
    return;
  } else if (min > max) {
    alert("Your minimum number cannot be higher than your maximum number");
    return;
  }

  winningNum = randomNum(min, max);
  document.getElementById("min-num").disabled = true;
  document.getElementById("max-num").disabled = true;
  document.getElementById("start-btn").disabled = true;
  document.getElementById("start-btn").classList.remove("btn-primary");
  document.getElementById("start-btn").classList.add("btn-secondary");
  document.getElementById("check-btn").disabled = false;
  document.getElementById("check-btn").classList.remove("btn-secondary");
  document.getElementById("check-btn").classList.add("btn-primary");
  document.getElementById("userNum").disabled = false;
  document.getElementById("reveal-btn").disabled = false;
  document.getElementById("reveal-btn").classList.remove("btn-secondary");
  document.getElementById("reveal-btn").classList.add("btn-warning");
  document.getElementById("counter").hidden = false;
}
function check() {
  tries += 1;

  const attempted = document.getElementById("attempted");
  const userNum = document.getElementById("userNum").value;
  const div = document.getElementById("numInfo");
  const trydiv = document.getElementById("tryDiv");
  const attempts = document.getElementById("tries");
  const lowerOrHigher = document.getElementById("lowerOrHigher");
  trydiv.hidden = false;
  if (userNum == "") {
    return;
  }
  div.classList.remove("bg-secondary");
  attempts.innerText = "Attempts: " + tries;
  trydiv.classList.remove("bg-secondary");

  if (tries < 10) {
    trydiv.classList.add("bg-success");
  } else if (tries > 10 && tries < 20) {
    trydiv.classList.remove("bg-success");
    trydiv.classList.add("bg-warning");
  } else if (tries > 20) {
    trydiv.classList.remove("bg-warning");
    trydiv.classList.add("bg-danger");
  }
  if (!attemptedNums.includes(userNum)) {
    attemptedNums[actualTries] = userNum;
    actualTries += 1;
    attempted.innerText = "";
    attemptedNums.sort(function (a, b) {
      return a - b;
    });
    for (i = 0; i < attemptedNums.length; i++) {
      if (i == attemptedNums.length - 1) {
        attempted.innerText += " " + attemptedNums[i];
      } else {
        attempted.innerText += "  " + attemptedNums[i] + ",";
      }
    }
  }
  if (userNum != winningNum) {
    div.classList.add("bg-warning");
  }
  if (userNum < winningNum) {
    lowerOrHigher.innerText = "Too Low";
  } else if (userNum > winningNum) {
    lowerOrHigher.innerText = "Too High";
  } else if (userNum == winningNum) {
    // User wins the game
    restart();
    lowerOrHigher.innerText = "Correct!";
    div.classList.remove("bg-warning");
    div.classList.add("bg-success");
  }
  document.getElementById("userNum").value = "";
}

function reveal() {
  document.getElementById("userNum").value = winningNum;
}

function restart() {
  const restartButton = document.getElementById("restart");
  const button = document.getElementById("reveal-btn");
  button.hidden = true;
  restartButton.hidden = false;
}

function resetGame() {
  document.getElementById("min-num").disabled = false;
  document.getElementById("max-num").disabled = false;
  document.getElementById("start-btn").disabled = false;
  document.getElementById("start-btn").classList.add("btn-primary");
  document.getElementById("start-btn").classList.remove("btn-secondary");
  document.getElementById("check-btn").disabled = true;
  document.getElementById("check-btn").classList.add("btn-secondary");
  document.getElementById("check-btn").classList.remove("btn-primary");
  document.getElementById("userNum").disabled = true;
  document.getElementById("reveal-btn").disabled = true;
  document.getElementById("reveal-btn").classList.add("btn-secondary");
  document.getElementById("reveal-btn").classList.remove("btn-warning");
  document.getElementById("counter").innerText = "";
  document.getElementById("counter").hidden = true;
  document.getElementById("numInfo").classList.remove("bg-success");

  if (document.getElementById("userNum").value != winningNum) {
    document.getElementById("numInfo").classList.remove("bg-warning");
  }
  document.getElementById("numInfo").classList.add("bg-secondary");
  document.getElementById("lowerOrHigher").innerText = "Please Start the Game";
  if (tries < 10) {
    document.getElementById("tryDiv").classList.remove("bg-success");
  } else if (tries > 10 && tries < 20) {
    document.getElementById("tryDiv").classList.remove("bg-warning");
  } else if (tries > 20) {
    document.getElementById("tryDiv").classList.remove("bg-danger");
  }
  document.getElementById("lowerOrHigher").innerText = "Please Start the Game";

  document.getElementById("tryDiv").classList.add("bg-secondary");
  document.getElementById("tries").innerText = "Attempt Counter";
  tries = 0;
  actualTries = 0;
  attemptedNums = clearArr(attemptedNums);
  document.getElementById("restart").hidden = true;
  document.getElementById("reveal-btn").hidden = false;
  document.getElementById("userNum").value = "";
}

function clearArr(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = "";
  }
  return array;
}
