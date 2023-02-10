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

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {search()}});

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

var accentInputEventListener
var backgroundInputEventListener
var searchEngineInputEventListener

function applySettings() {
    addStyleValuesToLocalStorage()
    var root = document.querySelector(":root")
    var storedAccentColor = localStorage.getItem("accentColor")
    var storedBackgroundColor = localStorage.getItem("backgroundColor")
    var storedSearchEngine = localStorage.getItem("searchEngine")
    const accentInput = document.getElementById("accent-color-input")
    const backgroundInput = document.getElementById("background-color-input")
    const searchEngineSelect = document.getElementById("search-engines")

    // All the accent color shenanigans
    root.style.setProperty("--accent-color", storedAccentColor)
    accentInput.value = rgbToHex(storedAccentColor.slice(0, storedAccentColor.indexOf(",")), storedAccentColor.slice(storedAccentColor.indexOf(",")+1, storedAccentColor.lastIndexOf(",")), storedAccentColor.slice(storedAccentColor.lastIndexOf(",")+1))
    if (!accentInputEventListener) {
        accentInput.addEventListener("change", () => {
            localStorage.setItem("accentColor", `${hexToRgb(accentInput.value).r},${hexToRgb(accentInput.value).g},${hexToRgb(accentInput.value).b}`)
            console.log("Accent Changed")
            applySettings()
        })
        accentInputEventListener = true
    }

    // All the background color shenanigans
    root.style.setProperty("--background-color", storedBackgroundColor)
    backgroundInput.value = rgbToHex(storedBackgroundColor.slice(0, storedBackgroundColor.indexOf(",")), storedBackgroundColor.slice(storedBackgroundColor.indexOf(",")+1, storedBackgroundColor.lastIndexOf(",")), storedBackgroundColor.slice(storedBackgroundColor.lastIndexOf(",")+1))
    if (!backgroundInputEventListener) {
        backgroundInput.addEventListener("change", () => {
            localStorage.setItem("backgroundColor", `${hexToRgb(backgroundInput.value).r},${hexToRgb(backgroundInput.value).g},${hexToRgb(backgroundInput.value).b}`)
            console.log("Background Changed")
            applySettings()
        })
        backgroundInputEventListener = true
    }

    // All the Search Engine shenanigans
    console.log(searchEngineSelect.value)
    searchEngineSelect.value = storedSearchEngine
    document.getElementById("search-input").placeholder = `Search with ${searchEngineSelect.options[searchEngineSelect.selectedIndex].text}`
    if(!searchEngineInputEventListener) {
        searchEngineSelect.addEventListener("change", () => {
            localStorage.setItem("searchEngine", `${searchEngineSelect.value}`)
            console.log("Search Engine Changed")
            applySettings()
        })
        searchEngineInputEventListener = true
    }
}

function addStyleValuesToLocalStorage() {
    if (localStorage.getItem("wasUsedBefore") == "true") return
    localStorage.setItem("wasUsedBefore", "true")
    localStorage.setItem("accentColor", "0,0,0")
    localStorage.setItem("backgroundColor", "255,255,255")
    localStorage.setItem("searchEngine", "google")
}