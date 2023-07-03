const body = document.body;
const apikey = document.getElementById("apiKey");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const imageTitle = document.getElementById("imageTitle");
const mainImage = document.getElementById("mainImage");
const videoFrame = document.getElementById("youtube");
const explanation = document.getElementById("explanation");
const buttonDiv = document.getElementById("buttonDiv");
const copyrightText = document.getElementById("copyright");
const dateTaken = document.getElementById("dateTaken");
const copyrightCol = document.getElementById("copyrightCol");
const explanationDiv = document.getElementById("explanationDiv");
const hiddenImages = document.getElementById("hiddenImages");
const preload = document.getElementById("preload");
const noImage = document.getElementById("noImage");
let today;
const url = new URL("https://api.nasa.gov/planetary/apod");
const dateOptions = { month: "long", day: "numeric", year: "numeric" };
let newurl;
let data;
let hdImage;
let count;

document.addEventListener("DOMContentLoaded", () => {
  today = new Date().toISOString().split("T")[0];
  startDate.max = today;
  endDate.max = today;
  startDate.value = today;
  endDate.value = today;
});

function getDateAhead(dateString, days) {
  let date = new Date(dateString);
  date.setDate(date.getDate() + days);

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");

  return year + "-" + month + "-" + day;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const formatDate = date.toLocaleDateString("en-US", dateOptions);
  return formatDate;
}

async function paste() {
  try {
    const clip = await navigator.clipboard.readText();
    return clip;
  } catch (error) {
    console.error(error);
  }
  return null;
}

async function pasteToApi() {
  const clip = await paste();
  if (clip) {
    apikey.value = clip;
  }
}

function loadingImage() {
  imageTitle.innerText = "Loading image...";
  mainImage.src = "../HomeAssets/gif/loading.gif";
  mainImage.alt = "Loading image";
}

function resetImage() {
  imageTitle.innerText = "Nasa Logo";
  mainImage.src = "../HomeAssets/images/svg/NASA.svg";
  mainImage.alt = "Picture of the NASA Logo";
}

async function submit() {
  if (!validateDates()) {
    return;
  }
  count = 0;
  buttonDiv.hidden = true;
  explanationDiv.hidden = true;
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
  if (!data) {
    resetImage();
    return;
  }
  if (preload.checked) {
    preloadImages();
  }
  displayImage(0);
  buttonDiv.hidden = false;
  explanationDiv.hidden = false;
}

async function fetchData(url) {
  const response = await fetch(url);
  if (response.status != 200) {
    if (response.status == 403) {
      alert("Invalid API key");
    } else {
      alert("Error");
    }
    return false;
  }
  const data = await response.json();
  return data;
}

function preloadImages() {
  hiddenImages.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    if (current["media_type"] == "image") {
      const image = current["url"];
      const element = document.createElement("img");
      element.src = image;
      hiddenImages.append(element);
    }
  }
}

function displayImage(imgCount) {
  const current = data[imgCount];
  const currentImage = current["url"];
  const currentTitle = current["title"];
  const currentExplanation = current["explanation"];
  const currentCopyright = current["copyright"];
  const currentDate = current["date"];
  const currentmediaType = current["media_type"];
  imageTitle.innerText = currentTitle;
  explanation.innerText = currentExplanation;
  if (currentCopyright) {
    copyrightCol.hidden = false;
    copyrightText.innerText = currentCopyright.replace(/\n/g, "");
  } else {
    copyrightCol.hidden = true;
  }
  dateTaken.innerText = formatDate(currentDate);
  if (currentmediaType == "video") {
    videoFrame.src =
      currentImage.replace(/youtube.com/g, "youtube-nocookie.com") +
      "&autoplay=1&mute=1";
    noImage.hidden = true;
    mainImage.hidden = true;
    videoFrame.hidden = false;
  } else if (currentmediaType == "image") {
    noImage.hidden = true;
    videoFrame.hidden = true;
    mainImage.hidden = false;
    mainImage.src = currentImage;
    mainImage.alt = currentTitle;
  } else {
    videoFrame.hidden = true;
    mainImage.hidden = true;
    noImage.hidden = false;
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

function changeEnd() {
  endDate.min = startDate.value;
}
function changeStart() {
  startDate.max = endDate.value;
}

function changeEndDate(days) {
  const oldDate = startDate.value;
  const newDate = getDateAhead(oldDate, days);
  if (newDate <= endDate.max) {
    endDate.value = newDate;
  } else {
    endDate.value = endDate.max;
  }
}

function validateDates() {
  if (startDate.value < startDate.min) {
    alert("Starting date cannot be before " + formatDate("1996-06-16"));
    return false;
  }
  if (startDate.value > startDate.max) {
    if (startDate.value > today) {
      alert("Starting date cannot be after today");
    } else if (startDate.value > startDate.max) {
      alert("Starting date cannot be after the end date");
    }
    return false;
  }
  if (endDate.value < endDate.min) {
    alert("End date cannot be before the starting date");
    return false;
  }
  if (endDate.value > endDate.max) {
    alert("End date cannot be after today");
    return false;
  }
  return true;
}
