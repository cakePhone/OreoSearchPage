function search() {
    var input_value = document.getElementById("search-input").value
    console.log(input_value)
    if (/^\s*$/.test(input_value)) return
    window.location.assign("https://duckduckgo.com/?q=" + encodeURIComponent(input_value))
}

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {search()}});