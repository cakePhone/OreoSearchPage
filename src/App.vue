<script setup>
import Search from './components/SearchAndGreetings.vue'
import Settings from './components/Settings.vue'
</script>

<template>
  <img :src="backgroundImage" id="background-image"/>
  <Search
    :searchengines="searchEngines"
    :searchengine="searchEngine"
    :nickname="nickname"
  ></Search>

  <Settings
    :nickname="nickname"
    :searchengine="searchEngine"
    :backgroundimage="backgroundImage"
    @changed-nickname="(nick) => nickname = nick"
    @changed-search-engine="(engine) => searchEngine = engine"
    @changed-bg-image="(image) => backgroundImage = image"
  ></Settings>
</template>

<script>
export default {
  name: 'App',
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
  },

  mounted() {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }
}
</script>