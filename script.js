function search() {
    var input_value = document.getElementById("search-input").value
    console.log(input_value)
    if (/^\s*$/.test(input_value)) return
    if (input_value.includes("https://") || input_value.includes("http://") || input_value.includes(".com")) {window.location.assign(input_value)}
    else {window.location.assign("https://duckduckgo.com/?q=" + encodeURIComponent(input_value))}
}

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {search()}});

function settingsToggle() {
    if (document.getElementById("settings-menu").classList.contains("invisible")) {
        document.getElementById("settings-menu").classList.remove("invisible")
        document.getElementById("settings-menu").classList.add("visible")
        console.log("settings opened")
    } else {
        document.getElementById("settings-menu").classList.remove("visible")
        document.getElementById("settings-menu").classList.add("invisible")
        console.log("settings closed")
    }
    console.log(document.getElementById("accent-color-input").value)
}

// thx to Tim Down at on Stack Overflow for these functions
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
    var rbgString = `${r},${g},${b}`
    return rbgString
}
  
function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}
// end of Stack Overflow functions

function applyStyles() {
    var root = document.querySelector(":root")
    var storedAccentColor = localStorage.getItem("backgroundColor")
    const accentInput = document.getElementById("accent-color-input")
    root.style.setProperty("--accent-color", localStorage.getItem("accentColor"))
    accentInput.value = rgbToHex(storedAccentColor.slice(0, storedAccentColor.indexOf(",")), storedAccentColor.slice(storedAccentColor.indexOf(",")+1, storedAccentColor.lastIndexOf(",")), storedAccentColor.slice(storedAccentColor.lastIndexOf(",")+1))
    //accentInput.addEventListener("change", (e) => {localStorage.setItem("accentColor", )})
    console.log(hexToRgb(accentInput.value))
}

function addStyleValuesToLocalStorage() {
    if (localStorage.getItem("wasUsedBefore") == null) {
        localStorage.setItem("wasUsedBefore", true)
        localStorage.setItem("accentColor", "0,0,0")
        localStorage.setItem("backgroundColor", "255,255,255")
    }
}