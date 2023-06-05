var title = document.title;
document.addEventListener("DOMContentLoaded", function () {
  if (title == "Credit Card Generator") {
    generateCard();
  }
});

var abc = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
};

const charMap = {
  "!": 0,
  "@": 1,
  "#": 2,
  $: 3,
  "%": 4,
  "^": 5,
  "&": 6,
  "*": 7,
  "(": 8,
  ")": 9,
  " ": 10,
  ".": 11,
  ",": 12,
  "[": 13,
  "]": 14,
  "|": 15,
  "/": 16,
  "\\": 17,
  "-": 18,
  "+": 19,
  "=": 20,
  _: 21,
  "`": 22,
  "~": 23,
  "?": 24,
  "<": 25,
  ">": 26,
  "{": 27,
  "}": 28,
  "'": 29,
  '"': 30,
  ";": 31,
  ":": 32,
};

var isAlpha = /^[A-Za-z]+$/;
var isUpper = /^[A-Z]+$/;
var isNumeric = /^-?\d+(\.\d+)?$/;

function update() {
  const password = document.getElementById("password").value;
  const hashPass = hash(password);
  document.getElementById("passLabel").innerHTML =
    "Hash: " + hashPass + "&nbsp; &nbsp;";
  if (title == "Encrypter") {
    encrypt();
  } else if (title == "Decrypter") {
    decrypt();
  }
}

function shiftUp(letter, num) {
  if (letter.toLowerCase() in abc) {
    const isCap = letter.toUpperCase() === letter;
    const position = abc[letter.toLowerCase()];
    for (const i in abc) {
      if (abc[i] == (position + num) % 26) {
        if (isCap) {
          return i.toUpperCase();
        } else {
          return i.toLowerCase();
        }
      }
    }
  } else if (letter in charMap) {
    const position = charMap[letter];
    const length = Object.keys(charMap).length;
    for (const i in charMap) {
      if (charMap[i] == (position + num) % length) {
        return i;
      }
    }
  } else if (!isNaN(parseInt(letter))) {
    const numShift = (parseInt(letter) + num) % 10;
    return numShift.toString();
  } else {
    return letter;
  }
}

function shiftDown(letter, num) {
  if (letter.toLowerCase() in abc) {
    const isCap = letter.toUpperCase() === letter;
    const position = abc[letter.toLowerCase()];

    for (const i in abc) {
      if (abc[i] === (position - num + 26) % 26) {
        if (isCap) {
          return i.toUpperCase();
        } else {
          return i.toLowerCase();
        }
      }
    }
  } else if (letter in charMap) {
    const position = charMap[letter];
    const length = Object.keys(charMap).length;
    for (const i in charMap) {
      if (charMap[i] === (position - num + length) % length) {
        return i;
      }
    }
  } else if (!isNaN(parseInt(letter))) {
    const numShift = (parseInt(letter) - num + 10) % 10;
    return numShift.toString();
  } else {
    return letter;
  }
}

function hash(pass) {
  let final = 0;
  for (i = 0; i < pass.length; i++) {
    let multiplier = pass.length;
    const currentIndex = pass[i];
    if (currentIndex.toLowerCase() in abc) {
      if (isUpper.test(currentIndex)) {
        multiplier *= 2;
      }
      final += (abc[currentIndex.toLowerCase()] + 1) * multiplier;
    } else if (isNumeric.test(currentIndex)) {
      final += parseInt(currentIndex);
    } else if (currentIndex in charMap) {
      final += (charMap[currentIndex] + 1) * multiplier;
    } else {
      final += 1;
    }
  }
  return final;
}

function encrypt() {
  const message = document.getElementById("userEncrypt").value;
  const password = document.getElementById("password").value;
  const hashPass = hash(password);
  const encrypted = encryptAny(message, hashPass);

  document.getElementById("output").innerHTML = encrypted;
}

function encryptAny(message, code) {
  message = message.toString();
  code = code.toString();
  let final = "";
  for (let i = 0; i < message.length; i++) {
    const currentLetter = message[i];
    const currentIndex = i % code.length;
    const current_num = parseInt(code[currentIndex]);
    final += shiftUp(currentLetter, current_num);
  }
  return final;
}

function decrypt() {
  const message = document.getElementById("userDecrypt").value;
  const password = document.getElementById("password").value;
  const hashPass = hash(password);
  const decrypted = decryptAny(message, hashPass);

  document.getElementById("output").innerHTML = decrypted;
}

function decryptAny(message, code) {
  message = message.toString();
  code = code.toString();
  let final = "";
  for (let i = 0; i < message.length; i++) {
    const currentLetter = message[i];
    const currentIndex = i % code.length;
    const current_num = parseInt(code[currentIndex]);
    final += shiftDown(currentLetter, current_num);
  }
  return final;
}

function copyCC() {
  let text = document.getElementById("output").innerHTML;
  navigator.clipboard.writeText(text);
}
function copytoClipboard() {
  let text = document.getElementById("output").value;
  navigator.clipboard.writeText(text);
}

function paste() {
  var title = document.title;
  var clip;
  navigator.clipboard
    .readText()
    .then((text) => {
      clip = text;
      console.log(clip);
      if (title == "Encrypter") {
        document.getElementById("userEncrypt").value = clip;
        encrypt();
      } else if (title == "Decrypter") {
        document.getElementById("userDecrypt").value = clip;
        decrypt();
      } else if (title == "Credit Card Validator") {
        document.getElementById("cc").value = clip;
        verifyCard();
      }
    })
    .catch((error) => {
      alert("There was a problem copying from the clipboard " + error);
    });
}

function reverseString(str) {
  var splitString = str.split("");
  var reverseArray = splitString.reverse();
  var joinArray = reverseArray.join("");
  return joinArray;
}
function verifyCard() {
  var card = document.getElementById("cc").value;
  document.getElementById("card").innerText = card;
  var doubledCard = doubleCardDemo(card);
  document.getElementById("doubleCard").innerText = doubledCard;
  card = reverseString(card);
  var start = 1;
  var sum = 0;
  for (var i in card) {
    i = parseInt(i);
    var place = parseInt(card[i]);
    if (start % 2 == 0) {
      place = place * 2;
      if (place > 9) {
        place -= 9;
      }

      sum += place;
    } else {
      sum += place;
    }
    start++;
  }
  if (sum.toString() != "NaN" && document.getElementById("cc") != "") {
    document.getElementById("sumOfDigits").innerText = sum;
  }

  if (sum % 10 == 0 && card != "" && /[a-zA-Z]/.test(card) == false) {
    valid = true;
  } else {
    valid = false;
  }

  if (valid) {
    document.getElementById("validCheck").className =
      "h-100 p-5 text-bg-success rounded-3";
    document.getElementById("validCheckText").innerText = "Valid";
  } else {
    document.getElementById("validCheck").className =
      "h-100 p-5 text-bg-danger rounded-3";
    document.getElementById("validCheckText").innerText = "Invalid";
  }

  leaveBlank(document.getElementById("sumOfDigits"));
  leaveBlank(document.getElementById("card"));
  leaveBlank(document.getElementById("doubleCard"));
}

function verifyCardAny(card) {
  card = reverseString(card);
  var start = 1;
  var sum = 0;
  for (var i in card) {
    i = parseInt(i);
    var place = parseInt(card[i]);
    if (start % 2 == 0) {
      place = place * 2;
      if (place > 9) {
        place -= 9;
      }

      sum += place;
    } else {
      sum += place;
    }
    start++;
  }

  if (sum % 10 == 0 && card != "" && /[a-zA-Z]/.test(card) == false) {
    valid = true;
  } else {
    valid = false;
  }
  return valid;
}

function doubleCardDemo(card) {
  var start = 1;
  card = reverseString(card);
  var finishedCard = "";
  for (var i in card) {
    var p = card[i];

    if (start % 2 == 0) {
      p = p * 2;
      if (p > 9) {
        p -= 9;
      }
      finishedCard += p;
    } else [(finishedCard += p)];
    start += 1;
  }

  finishedCard = reverseString(finishedCard);
  return finishedCard;
}

function generateCard() {
  var number = "";
  while (!verifyCardAny(number)) {
    number = "";
    for (var i = 0; i < 16; i++) {
      let x = Math.floor(Math.random() * 9 + 1);
      var y = x.toString();
      number += y;
    }
  }
  var sum = 0;
  for (var i in doubleCardDemo(number)) {
    sum += parseInt(doubleCardDemo(number)[i]);
  }
  document.getElementById("output").innerText = number;
  document.getElementById("card").innerText = number;
  var z = doubleCardDemo(number);
  document.getElementById("doubleCard").innerText = z;
  document.getElementById("sumOfDigits").innerText = sum;
}

function contactMe() {
  document.location.href = "mailto:odedconnect@gmail.com";
}

function leaveBlank(htmlID) {
  if (htmlID.innerText.length == 0 || htmlID.innerText == "0") {
    htmlID.innerHTML = "&nbsp;";
  }
}
