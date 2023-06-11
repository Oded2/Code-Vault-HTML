function randomNum(min, max) {
  let x = Math.floor(Math.random() * max + min);
  return x;
}

function dosomething() {
  const min = parseInt(document.getElementById("min-num").value);
  const max = parseInt(document.getElementById("max-num").value);
  if (min > max) {
    alert("Your minimum number cannot be higher than your maximum number");
    return;
  }
  document.getElementById("random-number").innerText = randomNum(min, max);
}
