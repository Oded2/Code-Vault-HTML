const apikey = document.getElementById("apiKey");

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
