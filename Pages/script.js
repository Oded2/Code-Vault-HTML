document.addEventListener("DOMContentLoaded", function () {
  if (document.title == "Credit Card Generator") {
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

var title = document.title;

function updateRangeValue() {
  var rangeValue = document.getElementById("shift").value;
  document.getElementById("rangeValue").innerHTML = rangeValue;
  if (title == "Encrypter") {
    encrypt();
  } else if (title == "Decrypter") {
    decrypt();
  }
}

function encrypt() {
  var result = "";
  var message = document.getElementById("userEncrypt").value;
  var shift = parseInt(document.getElementById("shift").value);
  var e = null;
  for (var i of message) {
    var isLetter = /[a-zA-Z]/.test(i);
    var isCap = /[A-Z]/.test(i);
    if (isLetter) {
      i = i.toLowerCase();
      var place = abc[i];
      place += shift;
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
  document.getElementById("output").innerHTML = result;
}
function decrypt() {
  var result = "";
  var message = document.getElementById("userDecrypt").value;
  var shift = parseInt(document.getElementById("shift").value);
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
  document.getElementById("output").innerHTML = result;
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
    .catch(() => {
      alert("There was a problem copying from the clipboard");
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
  document.getElementById("card").innerHTML = card;
  var doubledCard = doubleCardDemo(card);
  document.getElementById("doubleCard").innerHTML = doubledCard;
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
  if (sum != "NaN" && document.getElementById("cc") != "") {
    document.getElementById("sumOfDigits").innerHTML = sum;
  }

  if (sum % 10 == 0 && card != "" && /[a-zA-Z]/.test(card) == false) {
    valid = true;
  } else {
    valid = false;
  }

  if (valid) {
    document.getElementById("validCheck").style.color = "green";
    document.getElementById("validCheck").innerHTML = "Valid";
  } else {
    document.getElementById("validCheck").style.color = "red";
    document.getElementById("validCheck").innerHTML = "Invalid";
  }
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
  document.getElementById("output").innerHTML = number;
  document.getElementById("card").innerHTML = number;
  var z = doubleCardDemo(number);
  document.getElementById("doubleCard").innerHTML = z;
  document.getElementById("sumOfDigits").innerHTML = sum;
}
