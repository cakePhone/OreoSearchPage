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
}