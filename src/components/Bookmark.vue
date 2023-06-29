<template>
  <div class="bookmark" :data-index="bookmark">
    <div class="bookmark-box special-effects" @click="searchFunc(url)" @contextmenu="removeBookmark(bookmark)">
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
    }
  },
  mounted() {
    console.log(this.bookmarks[this.bookmark].name)
  },
  methods: {
    navigate() {
      console.log('Outta here!')
    },
    removeBookmark(bookmark) {
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

      bookmarks.splice(bookmark, 1)

      localStorage.setItem('bookmarks' ,JSON.stringify(bookmarks))

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