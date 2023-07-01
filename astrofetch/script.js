const apikey = document.getElementById("apiKey");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const imageTitle = document.getElementById("imageTitle");
const mainImage = document.getElementById("mainImage");
const youtubeFrame = document.getElementById("youtube");
const explanation = document.getElementById("explanation");
const buttonDiv = document.getElementById("buttonDiv");
let today;

const url = new URL("https://api.nasa.gov/planetary/apod");
let newurl;
let data;
let count = 0;

document.addEventListener("DOMContentLoaded", () => {
  today = new Date().toISOString().split("T")[0];
  startDate.max = today;
  endDate.max = today;
  startDate.value = today;
  endDate.value = today;
});

async function paste() {
  const permission = await navigator.permissions.query({
    name: "clipboard-read",
  });
  if (permission.state == "denied") {
    alert("Clipboard access was denied");
    return;
  }
  const clip = await navigator.clipboard.readText();
  return clip;
}

async function pasteToApi() {
  apikey.value = await paste();
}

function loadingImage() {
  imageTitle.innerText = "Loading image...";
  mainImage.src = "../HomeAssets/gif/loading.gif";
  mainImage.alt = "Loading image";
}

async function submit() {
  loadingImage();
  newurl =
    url +
    "?api_key=" +
    apikey.value +
    "&start_date=" +
    startDate.value +
    "&end_date=" +
    endDate.value;

  data = await fetchData(newurl);
  displayImage(0);
  buttonDiv.hidden = false;
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function displayImage(imgCount) {
  const currentImage = data[imgCount]["url"];
  const currentTitle = data[imgCount]["title"];
  const currentExplanation = data[imgCount]["explanation"];
  imageTitle.innerText = currentTitle;
  explanation.innerText = currentExplanation;
  if (currentImage.includes("youtube.com")) {
    youtubeFrame.src =
      currentImage.replace(/youtube.com/g, "youtube-nocookie.com") +
      "&autoplay=1&mute=1";
    youtubeFrame.hidden = false;
    mainImage.hidden = true;
  } else {
    youtubeFrame.hidden = true;
    mainImage.hidden = false;
    mainImage.src = currentImage;
    mainImage.alt = currentTitle;
  }
}

function changeCount(plus) {
  if (plus == 1) {
    count++;
    if (count >= data.length) {
      count = 0;
    }
  } else if (plus == 0) {
    count--;
    if (count < 0) {
      count = data.length - 1;
    }
  }
}

function nextImg() {
  changeCount(1);

  displayImage(count);
}
function prevImg() {
  changeCount(0);
  displayImage(count);
}
