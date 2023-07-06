const body = document.body;
const apikey = document.getElementById("apiKey");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const imageTitle = document.getElementById("imageTitle");
const explanation = document.getElementById("explanation");
const buttonDiv = document.getElementById("buttonDiv");
const copyrightText = document.getElementById("copyright");
const dateTaken = document.getElementById("dateTaken");
const copyrightCol = document.getElementById("copyrightCol");
const explanationDiv = document.getElementById("explanationDiv");
const hiddenImages = document.getElementById("hiddenImages");
const noImage = document.getElementById("noImage");
const imageContainer = document.getElementById("imageContainer");
let today;
const url = new URL("https://api.nasa.gov/planetary/apod");
const dateOptions = { month: "long", day: "numeric", year: "numeric" };
const nasaLogoPath = "../HomeAssets/images/svg/NASA.svg";
const loadingGifPath = "../HomeAssets/gif/loading.gif";
const iframeContainer = document.getElementById("iFrameContainer");
const elementPrefix = "img";
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
function addParams(link, params) {
  link = new URL(link);
  let value;
  for (key in params) {
    value = params[key];

    link.searchParams.append(key, value);
  }
  return link.toString();
}
function removeLineBreak(string) {
  string = string.replace(/\n/g, "");
  string = string.replace(/\r/g, "");
  return string;
}

function getDateAhead(dateString, days) {
  let date = new Date(dateString);
  date.setDate(date.getDate() + days);
  let year = String(date.getFullYear()).padStart(4, "0");
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

function changeImage(imgPath, imgTitle) {
  clearDivs();
  const newImg = document.createElement("img");
  newImg.src = imgPath;
  newImg.alt = imgTitle;
  newImg.classList.add("img-fluid", "object-fit-contain", "w-100", "h-100");
  imageContainer.appendChild(newImg);
}

function loadingImage() {
  imageTitle.innerText = "Loading image...";
  changeImage(loadingGifPath, "Loading Image");
}

function resetImage() {
  imageTitle.innerText = "Nasa Logo";
  changeImage(nasaLogoPath, "Nasa Logo");
}

function clearDivs() {
  imageContainer.innerHTML = "";
  iframeContainer.innerHTML = "";
}

async function submit() {
  if (!validateDates()) {
    return;
  }
  count = 0;
  buttonDiv.hidden = true;
  explanationDiv.hidden = true;
  iframeContainer.hidden = true;
  noImage.hidden = true;
  imageContainer.hidden = false;

  const params = {
    api_key: apikey.value,
    start_date: startDate.value,
    end_date: endDate.value,
  };
  newurl = addParams(url, params);
  console.log(newurl);
  loadingImage();
  data = await fetchData(newurl);
  if (!data) {
    resetImage();
    return;
  }
  insertImages();
  displayImage(0);

  buttonDiv.hidden = false;
  explanationDiv.hidden = false;
}

async function fetchData(url) {
  const response = await fetch(url);
  if (response.status != 200) {
    if (response.status == 403) {
      alert("Invalid API key");
    } else if (response.status == 429) {
      alert("Too many requests, try using a different API key");
    } else {
      alert("Error. Error code: " + response.status);
    }
    return false;
  }
  const data = await response.json();
  return data;
}

function insertImages() {
  clearDivs();
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    const currentApod = current["url"];
    const currentTitle = current["title"];
    const currentMediaType = current["media_type"];
    if (currentMediaType == "other") {
      continue;
    }
    let newElement;
    if (currentMediaType == "image") {
      newElement = document.createElement("img");
      newElement.src = currentApod;
      newElement.alt = currentTitle;
      newElement.classList.add("img-fluid", "object-fit-contain");
      imageContainer.appendChild(newElement);
    } else if (currentMediaType == "video") {
      const vimeoParams = { pip: 1, dnt: 1 };
      let newUrl = currentApod;
      if (currentApod.includes("youtube.com")) {
        newUrl = currentApod.replace(/youtube.com/g, "youtube-nocookie.com");
      } else if (currentApod.includes("vimeo.com")) {
        newUrl = addParams(currentApod, vimeoParams);
      }
      newElement = document.createElement("iframe");
      newElement.src = newUrl;
      newElement.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframeContainer.appendChild(newElement);
    }
    newElement.classList.add("w-100", "h-100");
    newElement.id = elementPrefix + i;
    newElement.hidden = true;
  }
}

function displayImage(imgCount) {
  const current = data[imgCount];
  const currentTitle = current["title"];
  const currentExplanation = current["explanation"];
  const currentCopyright = current["copyright"];
  const currentDate = current["date"];
  const currentMediaType = current["media_type"];

  imageTitle.innerText = currentTitle;
  explanation.innerText = removeLineBreak(currentExplanation);
  if (currentCopyright) {
    copyrightCol.hidden = false;
    copyrightText.innerText = removeLineBreak(currentCopyright);
  } else {
    copyrightCol.hidden = true;
  }
  dateTaken.innerText = formatDate(currentDate);
  visibleElement(imgCount, false);
  if (currentMediaType == "video") {
    noImage.hidden = true;
    imageContainer.hidden = true;
    iframeContainer.hidden = false;
  } else if (currentMediaType == "image") {
    noImage.hidden = true;
    iframeContainer.hidden = true;
    imageContainer.hidden = false;
  } else {
    console.debug(current);
    iframeContainer.hidden = true;
    imageContainer.hidden = true;
    noImage.hidden = false;
  }
}

function visibleElement(elementNum, hidden) {
  const mediaType = data[elementNum]["media_type"];
  if (mediaType != "other") {
    document.getElementById(elementPrefix + elementNum).hidden = hidden;
  }
}

function changeCount(plus) {
  visibleElement(count, true);
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
  changeStart();
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
