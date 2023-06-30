<script setup>
import Bookmark from './Bookmark.vue'
</script>

<template>
  <div id="bookmarks-container">
    <Bookmark v-for="bookmark in bookmarks"
      :bookmarks="bookmarks"
      :bookmark="bookmarks.indexOf(bookmark)"
      :searchengine="searchengine"
      :searchengines="searchengines"
      @removedBookmarks="this.$emit('updateBookmarks')"
    ></Bookmark>
  </div>
</template>

<script>
export default {
  name: 'Bookmarks',
  props: {
    bookmarks: {
      type: Array,
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
  }
}
</script>

// TODO: FIX INDEXING
<style scoped>
#bookmarks-container {
  height: fit-content;
  width: 48rem;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  margin-top: 4rem;

  flex-wrap: wrap;
}
</style>