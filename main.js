const app = Vue.createApp({
  //! Put global variables here
  data() {
    return {
      searchEngines: [
        {"name": "Google", "url": "https://www.google.com/search?q="},
        {"name": "DuckDuckGo", "url": "https://duckduckgo.com/?q="},
        {"name": "Bing", "url": "https://www.bing.com/search?q="},
        {"name": "Brave", "url": "https://search.brave.com/search?q="},
        {"name": "Ecosia", "url": "https://www.ecosia.org/search?method=index&q="}
      ],
      searchEngine: (localStorage.getItem("searchEngine")) ? localStorage.getItem("searchEngine") : "0",

      nickname: (localStorage.getItem("username")) ? localStorage.getItem("username") : "",
      backgroundImage: (localStorage.getItem("backgroundImage")) ? `data:image/png;base64,${localStorage.getItem("backgroundImage")}` : "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA"
    }
  }
})