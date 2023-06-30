<template>
  <div class="bookmark" :data-index="bookmark">
    <div class="bookmark-box special-effects" @click="navigate(url)" @contextmenu="removeBookmark(bookmark)">
      <p class="text initial">{{ this.bookmarks[this.bookmark].name ? this.bookmarks[this.bookmark].name.slice(0,1) : '' }}</p>
    </div>
    <p class="text bookmark-title">{{ this.bookmarks[this.bookmark].name ? this.bookmarks[this.bookmark].name : 'Add Bookmark' }}</p>
  </div>
</template>

<script>
export default {
  name: 'Bookmark',
  props: {
    bookmarks: {
      required: true
    },
    bookmark: {
      required: true
    },
    searchengines: {
      type: Array,
      required: true
    },
    searchengine: {
      type: String,
      required: true
    },
  },
  methods: {
    navigate(input) {
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
    removeBookmark(bookmark) {
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

      bookmarks.splice(bookmark, 1)

      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

      this.$emit('removedBookmarks')
    }
  }
}
</script>

<style scoped>
.bookmark-box {
  border-radius: 1rem;
  height: 5rem;
  width: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(var(--accent-color), 0.2);
}

.bookmark {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0rem 1rem;
}

.bookmark-title {
  width: 5.5rem;
  text-align: center;
}

.initial {
  font-size: 2rem;
  pointer-events: none;
}
</style>