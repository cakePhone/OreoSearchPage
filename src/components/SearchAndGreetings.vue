<script setup>
import Bookmarks from './Bookmarks.vue'
</script>

<template>
  <main>
    <p class="text" id="greeting">{{ greeting }}</p>

    <div :class="{'focus': searchFocus}" class="special-effects" id="search-box-container">

      <Icon :icon="['fas', 'search']" class="icons"></Icon>

      <input class="text" type="text" :placeholder="searchPlaceholder" id="search-text" @focus="searchFocus = true" @blur="searchFocus = false" @keyup.enter="search(searchInput)" v-model="searchInput">

      <Icon :icon="['fas', 'plus']" class="icons" id="add-bookmark" :class="{'show-add-bookmark': searchInput}" @click="addBookmark()"></Icon>

    </div>
    <Bookmarks
      :bookmarks="bookmarks"
      :searchengine="searchengine"
      :searchengines="searchengines"
      @updateBookmarks="updateBookmarks"
    ></Bookmarks>
  </main>
</template>

<script>
export default {
  name: 'Search',
  props: {
    searchengines: {
      type: Array,
      required: true
    },
    searchengine: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchFocus: false,
      searchInput: "",
      bookmarks: localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : []
    }
  },

  computed: {
    searchPlaceholder() { return "Search with " + this.searchengines[this.searchengine].name },

    greeting() { return `${this.greetings(this.nickname.trim().length > 33 ? this.nickname.trim().slice(0, 30) + "..." : this.nickname.trim())}` }
  },

  methods: {
    search(input) {
      if (/^\s*$/.test(input)) return
      const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i') // validate fragment locator
        
        return !!urlPattern.test(urlString)
      }

      if (isValidUrl(input)) {
        if (input.startsWith("https://") || input.startsWith("http://")) {
          window.location.href = input
        } else {
          window.location.href = encodeURI("https://" + input)
        }
      } else { window.location.href = this.searchengines[this.searchengine].url + encodeURIComponent(input) }
    },

    greetings(nickname) {
      const hour = new Date().getHours()
      let timeOfDayString
      if(hour < 7 || hour > 19) {
        timeOfDayString = "Good night"
      }
      else if(hour < 13) {
        timeOfDayString = "Good morning"
      }
      else if (hour < 18) {
        timeOfDayString = "Good afternoon"
      }
      else {
        timeOfDayString = "Good evening"
      }

      if(nickname !== "") {
        return `${timeOfDayString}, ${nickname}!`
      } else {
        return `${timeOfDayString}!`
      }
    },

    addBookmark() {
      if(!localStorage.getItem('bookmarks')) localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))

      this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

      let bookmarkName = window.prompt('Name the bookmark:', 'Bookmark')

      if(bookmarkName === null) return
      if(!bookmarkName) bookmarkName = this.searchInput

      this.bookmarks.push({name: bookmarkName, url: this.searchInput})
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
    },

    updateBookmarks() {
      this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }
  }
}
</script>