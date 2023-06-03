// TEMPORARY
// redirect();

function redirect() {
  location.href = "fun-projects/index.html";
}

let root;
let body;

document.addEventListener("DOMContentLoaded", function () {
  body = document.getElementById("body");
  root = document.querySelector(":root");
  body.style.backgroundColor = "var(--body)";
});

function changeColor() {
  const checkbox = document.getElementById("darkMode");
  if (checkbox.checked) {
    root.style.setProperty("--body", "#292929");
    root.style.setProperty("--w3Black", "#333");
    root.style.setProperty("--black", "#1c1c1c");
    root.style.setProperty("--fullBlack", "black");
    root.style.setProperty("--fullWhite", "white");
    root.style.setProperty("--lightGray", "#ddd");
  } else {
    root.style.setProperty("--body", "#e6e6e6");
    root.style.setProperty("--w3Black", "#a3a3a3");
    root.style.setProperty("--black", "#ffffff");
    root.style.setProperty("--fullBlack", "white");
    root.style.setProperty("--fullWhite", "black");
    root.style.setProperty("--lightGray", "#525252");
  }
}
