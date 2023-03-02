const app = Vue.createApp({

  //! Put variables here
  data() {
    return {
      searchEngines: [
        {"name": "Google", "url": "https://www.google.com/search?q="},
        {"name": "DuckDuckGo", "url": "https://duckduckgo.com/?q="},
        {"name": "Bing", "url": "https://www.bing.com/search?q="},
        {"name": "Brave", "url": "https://search.brave.com/search?q="},
        {"name": "Ecosia", "url": "https://www.ecosia.org/search?method=index&q="}
      ],
      settingsClosed: true,
      searchFocus: false,
      
      searchInput: "",
      searchEngine: (localStorage.getItem("searchEngine")) ? localStorage.getItem("searchEngine") : "0",

      inputNickname: (localStorage.getItem("username")) ? localStorage.getItem("username") : "",
      accentColor: (localStorage.getItem("accentColor")) ? localStorage.getItem("accentColor") : "#ffffff",
      backgroundColor: (localStorage.getItem("backgroundColor")) ? localStorage.getItem("backgroundColor") : "#000000"
    }
  },

  //! Mounted
  mounted() {
    window.addEventListener("load", () => {
      //* Take care of settings at start
      this.updateAccentColor()
      this.updateBackgroundColor()
      this.updateSearchEngine()
    })
  },

  //! Methods
  methods: {
    greetings(username) {
      const timenow = new Date().getHours()
      let timeOfDayString
      if(timenow < 7 || timenow > 19) {
        timeOfDayString = "Good night"
      }
      else if(timenow < 12) {
        timeOfDayString = "Good morning"
      }
      else if (timenow < 18) {
        timeOfDayString = "Good afternoon"
      }
      else {
        timeOfDayString = "Good evening"
      }

      if(username !== "") {
        return `${timeOfDayString}, ${username}!`
      } else {
        return `${timeOfDayString}!`
      }
    },

    updateLocalStorage(key, value) {
      //if(localStorage.getItem(key) === value) { return localStorage.getItem(key) }
      if(value || value === "") { localStorage.setItem(key, value) }
      // console.log(`${key} was changed`)
      return localStorage.getItem(key)
    },

    hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    },

    rgbToHex(r, g, b) {
      return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)
    },

    updateAccentColor() {
      if(!localStorage.getItem("accentColor")) { localStorage.setItem("accentColor", "#ffffff") }
      localStorage.setItem("accentColor", this.accentColor)

      // console.log(this.hexToRgb(localStorage.getItem("accentColor")))

      document.documentElement.style.setProperty("--accent-color", `${this.hexToRgb(this.accentColor).r},${this.hexToRgb(this.accentColor).g},${this.hexToRgb(this.accentColor).b}`)
    },

    updateBackgroundColor() {
      if(!localStorage.getItem("backgroundColor")) { localStorage.setItem("backgroundColor", "#000000") }
      localStorage.setItem("backgroundColor", this.backgroundColor)

      // console.log(this.hexToRgb(localStorage.getItem("backgroundColor")))

      document.documentElement.style.setProperty("--background-color", `${this.hexToRgb(this.backgroundColor).r},${this.hexToRgb(this.backgroundColor).g},${this.hexToRgb(this.backgroundColor).b}`)

    },

    search() {
      if (/^\s*$/.test(this.searchInput)) return
      const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i') // validate fragment locator

        return !!urlPattern.test(urlString)
      }

      if (isValidUrl(this.searchInput)) {
        if (this.searchInput.startsWith("https://") || this.searchInput.startsWith("http://")) {
          window.location.href = this.searchInput
        } else {
          window.location.href = encodeURI("https://" + this.searchInput)
        }
      } else { window.location.href = this.searchEngines[this.searchEngine].url + encodeURIComponent(this.searchInput) }
    },

    settingsToggle() {
      this.settingsClosed = !this.settingsClosed
    },

    updateSearchEngine() {
      console.log(!localStorage.getItem("searchEngine"))
      if(!localStorage.getItem("searchEngine")) { localStorage.setItem("searchEngine", "0") }
      localStorage.setItem("searchEngine", this.searchEngine)
    }
  },

  //! Computed Values
  computed: {
    searchPlaceholder() { return "Search with " + this.searchEngines[this.searchEngine].name },

    greeting() { return `${this.greetings(this.nickname)}` },

    // searchEngine() {
    //   if(!localStorage.getItem("searchEngine")) {localStorage.setItem("searchEngine", "0")}
    //   return this.searchEngines[localStorage.getItem("searchEngine")]
    // },

    nickname() {
      this.inputNickname = this.inputNickname.trim().length > 33 ? this.inputNickname.trim().slice(0, 30) + "..." : this.inputNickname
      return this.updateLocalStorage("username", this.inputNickname.trim())
    },
  }
})