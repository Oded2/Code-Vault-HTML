let winningNum;
let tries = 0;
let actualTries = 0;
let attemptedNums = [];
function randomNum(min, max) {
  let x = Math.floor(Math.random() * max + min);
  return x;
}

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
  document.getElementById("start-btn").className =
    "btn btn-secondary fs-5 w-25";
  document.getElementById("check-btn").disabled = false;
  document.getElementById("check-btn").classList.remove("btn-secondary");
  document.getElementById("check-btn").classList.add("btn-primary");
  document.getElementById("userNum").disabled = false;
  document.getElementById("reveal-btn").disabled = false;
  document.getElementById("reveal-btn").classList.remove("btn-secondary");
  document.getElementById("reveal-btn").classList.add("btn-warning");
}
function check() {
  tries += 1;

  const attempted = document.getElementById("attempted");
  const userNum = document.getElementById("userNum").value;
  const div = document.getElementById("numInfo");
  const trydiv = document.getElementById("tryDiv");
  const attempts = document.getElementById("tries");
  const lowerOrHigher = document.getElementById("lowerOrHigher");
  if (userNum == "") {
    return;
  }
  div.classList.remove("bg-secondary");
  attempts.innerText = "Attempts: " + tries;
  trydiv.classList.remove("bg-secondary");
  if (userNum != winningNum) {
    div.classList.add("bg-warning");
  }
  if (userNum < winningNum) {
    lowerOrHigher.innerText = "Too Low";
  } else if (userNum > winningNum) {
    lowerOrHigher.innerText = "Too High";
  } else if (userNum == winningNum) {
    lowerOrHigher.innerText = "Correct!";
    div.classList.remove("bg-warning");
    div.classList.add("bg-success");
  }
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
    attemptedNums[actualTries - 1] = userNum;
    actualTries += 1;
  } else {
    return;
  }

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

function reveal() {
  document.getElementById("userNum").value = winningNum;
}
