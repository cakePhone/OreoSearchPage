app.component("search-greetings", {
  props: {
    greeting: {
      type: String,
      required: true
    },
    searchengines: {
      required: true
    },
    searchengine: {
      type: String,
      required: true
    }
  },

  template:
  /*html*/
  `
  <main>
    <p class="text" id="greeting">{{ greeting }}</p>

    <div :class="{'focus': searchFocus}" class="special-effects" id="search-box-container">

      <i class="fa fa-search icons"></i>

      <input class="text" type="text" :placeholder="searchPlaceholder" id="search-text" @focus="searchFocus = true" @blur="searchFocus = false" @keyup.enter="search" v-model="searchInput">

    </div>
  </main>
  `,

  data() {
    return {
      searchFocus: false,
      searchInput: ""
    }
  },

  computed: {
    searchPlaceholder() { return "Search with " + this.searchengines[this.searchengine].name },
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
  },
})