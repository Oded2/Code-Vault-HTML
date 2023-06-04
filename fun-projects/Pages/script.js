var title = document.title;
document.addEventListener("DOMContentLoaded", function () {
  if (title == "Credit Card Generator") {
    generateCard();
  }
});

var abc = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
};

var isAlpha = /^[A-Za-z]+$/;
var isUpper = /^[A-Z]+$/;
var isNumeric = /^-?\d+(\.\d+)?$/;

function update() {
  if (title == "Encrypter") {
    encrypt();
  } else if (title == "Decrypter") {
    decrypt();
  }
}

// def hash(string):
//     final = 0

//     for i in string:
//         multiplier = len(string)
//         i = str(i)
//         if i.isalpha():
//             if i.isupper():
//                 multiplier *= 2

//             final += (az_map[i.lower()] + 1)*multiplier

//         elif i.isnumeric():
//             final += int(i) * multiplier
//         elif i in charMap:
//             final += charMap[i] * multiplier
//         else:
//             final += 1
//     return final

function hash(pass) {
  let final = 0;
  for (i = 0; i < pass.length; i++) {
    let multiplier = pass.length;
    const currentIndex = pass[i];
    if (isAlpha.test(currentIndex)) {
      if (isUpper.test(currentIndex)) {
        multiplier *= 2;
      }
      final += abc[currentIndex.toLowerCase()] * multiplier;
    } else if (isNumeric.test(currentIndex)) {
      final += parseInt(currentIndex);
    } else {
      final += 1;
    }
  }
  return final;
}

function encrypt() {
  var message = document.getElementById("userEncrypt").value;
  var password = parseInt(document.getElementById("password").value);
  document.getElementById("output").innerText = encryptAny(message, password);
}
function encryptAny(message, password) {
  var result = "";
  var e = null;
  for (var i of message) {
    var isLetter = /[a-zA-Z]/.test(i);
    var isCap = /[A-Z]/.test(i);
    if (isLetter) {
      i = i.toLowerCase();
      var place = abc[i];
      place += password;
      if (place > 26) {
        place -= 26;
      }
      for (var key in abc) {
        if (abc[key] == place) {
          e = key;
          break;
        }
      }
      if (isCap) {
        e = e.toUpperCase();
      }
    } else {
      e = i;
    }
    result += e;
  }
  return result;
}

function decrypt() {
  var message = document.getElementById("userDecrypt").value;
  var shift = parseInt(document.getElementById("shift").value);
  document.getElementById("output").innerText = decryptAny(message, shift);
}

function decryptAny(message, shift) {
  var result = "";

  var e = null;
  for (var i of message) {
    var isLetter = /[a-zA-Z]/.test(i);
    var isCap = /[A-Z]/.test(i);
    if (isLetter) {
      i = i.toLowerCase();
      var place = abc[i];
      place -= shift;
      if (place < 1) {
        place += 26;
      }
      for (var key in abc) {
        if (abc[key] == place) {
          e = key;
          break;
        }
      }
      if (isCap) {
        e = e.toUpperCase();
      }
    } else {
      e = i;
    }
    result += e;
  }
  return result;
}

function copytoClipboard() {
  var text = document.getElementById("output").innerHTML;
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
        document.getElementById("userEncrypt").innerHTML = clip;
        encrypt();
      } else if (title == "Decrypter") {
        document.getElementById("userDecrypt").innerHTML = clip;
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
