const apikey = document.getElementById("apiKey");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const imageTitle = document.getElementById("imageTitle");
const mainImage = document.getElementById("mainImage");
let today;

const url = new URL("https://api.nasa.gov/planetary/apod");
let newurl;

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
  console.log("URL", newurl);
  let temp = await fetchData(newurl);
  console.log(temp);
  let currentImage = temp[0]["url"];
  let currentTitle = temp[0]["title"];
  mainImage.src = currentImage;
  mainImage.alt = currentTitle;
  imageTitle.innerText = currentTitle;
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
