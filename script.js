const currentVersion = 20230211.02

const searchEngines = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    bing: "https://www.bing.com/search?q=",
    brave: "https://search.brave.com/search?q="
}

function search() {
    var input_value = document.getElementById("search-input").value
    var searchEngine = localStorage.getItem("searchEngine")
    if (/^\s*$/.test(input_value)) return
    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
      return !!urlPattern.test(urlString);
    }
    if (isValidUrl(input_value)) {
        if (input_value.startsWith("https://") || input_value.startsWith("http://")) {
            window.location.href = input_value
        } else {
            window.location.href = encodeURI("https://" + input_value)
        }
    } else {window.location.href = searchEngines[searchEngine] + encodeURIComponent(input_value)}
}

// Basically takes care of the stuffs when you click the settings button
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
}

// Thx to Tim Down at on Stack Overflow for these functions
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}
  
function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}
// end of Stack Overflow functions

// Main code
var accentInputEventListener
var backgroundInputEventListener
var searchEngineInputEventListener
var root = document.querySelector(":root")
var storedAccentColor = localStorage.getItem("accentColor")
var storedBackgroundColor = localStorage.getItem("backgroundColor")
var storedSearchEngine = localStorage.getItem("searchEngine")
const accentInput = document.getElementById("accent-color-input")
const backgroundInput = document.getElementById("background-color-input")
const searchEngineSelect = document.getElementById("search-engines")

function onPageLoad() {
    // Version check
    if (localStorage.getItem("version") < currentVersion ) {
        localStorage.setItem("version", currentVersion)
        updateLocalStorageValues()
    }
    document.addEventListener("keypress", function(event) {
        if (event.keyCode == 13) {search()}
    });

    // Call all settings related functions
    accentColor()
    backgroundColor()
    searchEngine()
}

// Takes care of changes in Accent Color
function accentColor() {
    if (!accentInputEventListener) {
        root.style.setProperty("--accent-color", storedAccentColor)
        accentInput.value = rgbToHex(storedAccentColor.slice(0, storedAccentColor.indexOf(",")), storedAccentColor.slice(storedAccentColor.indexOf(",")+1, storedAccentColor.lastIndexOf(",")), storedAccentColor.slice(storedAccentColor.lastIndexOf(",")+1))
        accentInput.addEventListener("change", () => {
            localStorage.setItem("accentColor", `${hexToRgb(accentInput.value).r},${hexToRgb(accentInput.value).g},${hexToRgb(accentInput.value).b}`)
            console.log("Accent Changed")
            accentColor()
        })
        accentInputEventListener = true
    }
}

function backgroundColor() {
    if (!backgroundInputEventListener) {
        root.style.setProperty("--background-color", storedBackgroundColor)
        backgroundInput.value = rgbToHex(storedBackgroundColor.slice(0, storedBackgroundColor.indexOf(",")), storedBackgroundColor.slice(storedBackgroundColor.indexOf(",")+1, storedBackgroundColor.lastIndexOf(",")), storedBackgroundColor.slice(storedBackgroundColor.lastIndexOf(",")+1))
        backgroundInput.addEventListener("change", () => {
            localStorage.setItem("backgroundColor", `${hexToRgb(backgroundInput.value).r},${hexToRgb(backgroundInput.value).g},${hexToRgb(backgroundInput.value).b}`)
            console.log("Background Changed")
            backgroundColor()
        })
        backgroundInputEventListener = true
    }
}

function searchEngine() {
    if(!searchEngineInputEventListener) {
        searchEngineSelect.value = storedSearchEngine
        document.getElementById("search-input").placeholder = `Search with ${searchEngineSelect.options[searchEngineSelect.selectedIndex].text}`
        searchEngineSelect.addEventListener("change", () => {
            localStorage.setItem("searchEngine", `${searchEngineSelect.value}`)
            document.getElementById("search-input").placeholder = `Search with ${searchEngineSelect.options[searchEngineSelect.selectedIndex].text}`
            console.log("Search Engine Changed")
            searchEngine()
        })
        searchEngineInputEventListener = true
    }
}

function setDefaultConfig() {
    localStorage.setItem("accentColor", "0,0,0")
    localStorage.setItem("backgroundColor", "255,255,255")
    localStorage.setItem("searchEngine", "google")
}

// This function is pretty much useless and is only called once every update
function updateLocalStorageValues() {

}