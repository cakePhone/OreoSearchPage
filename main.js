const app = Vue.createApp({
  data() {
    return {
      searchEngines: [
        {"name": "Google", "url": "https://www.google.com/search?q="},
        {"name": "DuckDuckGo", "url": "https://duckduckgo.com/?q="},
        {"name": "Bing", "url": "https://www.bing.com/search?q="},
        {"name": "Brave", "url": "https://search.brave.com/search?q="},
        {"name": "Ecosia", "url": "https://www.ecosia.org/search?method=index&q="}
      ],
      inputNickname: (localStorage.getItem("username")) ? localStorage.getItem("username") : "",
      searchInput: "",
      accentColor: "",
      settingsClosed: true
    }
  },
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
      if(localStorage.getItem(key) === value) { return localStorage.getItem(key) }
      localStorage.setItem(key, value)
      console.log(`${key} was changed`)
      return localStorage.getItem(key)
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
      } else { window.location.href = this.searchEngine.url + encodeURIComponent(this.searchInput) }
    },

    settingsToggle() {
      this.settingsClosed = !this.settingsClosed
    }
  },
  computed: {
    searchPlaceholder() { return "Search with " + this.searchEngine.name },

    greeting() { return `${this.greetings(this.nickname)}` },

    searchEngine() {
      if(!localStorage.getItem("searchEngine")) {localStorage.setItem("searchEngine", "0")}
      return this.searchEngines[localStorage.getItem("searchEngine")]
    },

    nickname() {
      this.inputNickname = this.inputNickname.trim().length > 33 ? this.inputNickname.trim().slice(0, 30) + "..." : this.inputNickname
      return this.updateLocalStorage("username", this.inputNickname.trim())
    },


  }
})