<template>
  <main>
    <p class="text" id="greeting">{{ greeting }}</p>

    <div :class="{'focus': searchFocus}" class="special-effects" id="search-box-container">

      <Icon :icon="['fas', 'search']" class="icons"></Icon>

      <input class="text" type="text" :placeholder="searchPlaceholder" id="search-text" @focus="searchFocus = true" @blur="searchFocus = false" @keyup.enter="search" v-model="searchInput">

    </div>
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
      searchInput: ""
    }
  },

  computed: {
    searchPlaceholder() { return "Search with " + this.searchengines[this.searchengine].name },

    greeting() { return `${this.greetings(this.nickname.trim().length > 33 ? this.nickname.trim().slice(0, 30) + "..." : this.nickname.trim())}` }
  },

  methods: {
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
      } else { window.location.href = this.searchengines[this.searchengine].url + encodeURIComponent(this.searchInput) }
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
  }
}
</script>