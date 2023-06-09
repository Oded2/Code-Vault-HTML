let image = null;

window.onload = () => {
  image = document.getElementById("userIMG");
  document.getElementById("metaIMG").onchange = loadFile;
};

function loadFile(event) {
  let file = event.target.files[0];
  // document.getElementById("fileName").innerText = file.name;
  image.src = URL.createObjectURL(file);
  EXIF.getData(file, processEXIF);
}

function processEXIF() {
  var a = Object.keys(EXIF.getAllTags(this)).length;
  if (a === 0) {
    console.log("No exif data");
    document.getElementById("openstreetmap").src =
      "https://www.openstreetmap.org/export/embed.html?bbox=-132.67089843750003%2C21.779905342529645%2C-59.28222656250001%2C51.781435604431195&amp;layer=mapnik";
    alert("No exif data found in this file");
  } else {
    const make = EXIF.getTag(this, "Make");

    const model = EXIF.getTag(this, "Model");
    const resolution = image.naturalWidth + " x " + image.naturalHeight;
    const longitude = EXIF.getTag(this, "GPSLongitude");
    const latitude = EXIF.getTag(this, "GPSLatitude");
    let megapixel = Math.floor(
      (image.naturalWidth * image.naturalHeight) / 1000000
    );

    var lonDegree = longitude[0];
    var lonMinute = longitude[1];
    var lonSecond = longitude[2];
    var lonDirection = EXIF.getTag(this, "GPSLongitudeRef");
    var lonFinal = ConvertDMSToDD(
      lonDegree,
      lonMinute,
      lonSecond,
      lonDirection
    );
    var latDegree = latitude[0];
    var latMinute = latitude[1];
    var latSecond = latitude[2];
    var latDirection = EXIF.getTag(this, "GPSLatitudeRef");
    var latFinal = ConvertDMSToDD(
      latDegree,
      latMinute,
      latSecond,
      latDirection
    );
    const finalLocation = createMapEmbedLink(latFinal, lonFinal);

    let flash = EXIF.getTag(this, "Flash");
    if (flash == "Flash did not fire, compulsory flash mode") {
      flash = "Off";
    } else if (flash == "Flash fired, compulsory flash mode") {
      flash = "On";
    }
    document.getElementById("openstreetmap").src = finalLocation;
    document.getElementById("dataMake").innerText = "Make: " + make;
    document.getElementById("dataModel").innerText = "Model: " + model;
    document.getElementById("dataResolution").innerText =
      "Resolution: " + resolution;
    document.getElementById("dataMegapixel").innerText =
      "Megapixels: " + megapixel;
    document.getElementById("dataFlash").innerText = "Flash: " + flash;
  }
}
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
  var dd = degrees + minutes / 60 + seconds / 3600;

  if (direction == "S" || direction == "W") {
    dd = dd * -1;
  }

  return dd;
}

function createMapEmbedLink(latitude, longitude) {
  const degrees = 30 / 111.32;
  const bbox = [
    longitude - degrees,
    latitude - degrees,
    longitude + degrees,
    latitude + degrees,
  ].join(",");

  const marker = `${latitude},${longitude}`;

  const embedLink = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&amp;layer=mapnik&marker=${marker}`;
  return embedLink;
}
