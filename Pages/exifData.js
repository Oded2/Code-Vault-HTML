let image = null;
window.onload = () => {
  image = document.getElementById("userIMG");
  document.getElementById("metaIMG").onchange = loadFile;
};

function loadFile(event) {
  let file = event.target.files[0];
  document.getElementById("fileName").innerText = file.name;
  image.src = URL.createObjectURL(file);
  EXIF.getData(file, processEXIF);
}

function processEXIF() {
  const make = EXIF.getTag(this, "Make");
  const model = EXIF.getTag(this, "Model");
  document.getElementById("dataMake").innerText = "Make: " + make;
  document.getElementById("dataModel").innerText = "Model: " + model;
}
