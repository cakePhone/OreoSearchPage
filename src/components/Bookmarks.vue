<script setup>
import Bookmark from './Bookmark.vue'
</script>

<template>
  <div id="bookmarks-container">
    <Bookmark v-for="bookmark in bookmarks"
      :bookmarks="bookmarks"
      :bookmark="bookmarks.indexOf(bookmark)"
      :searchFunc="searchFunc"
      @removedBookmarks="this.$emit('removedBookmarks')"
    ></Bookmark>
  </div>
</template>

<script>
export default {
  name: 'Bookmarks',
  props: {
    searchFunc: {
      type: Function
    },
    bookmarks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
#bookmarks-container {
  height: fit-content;
  width: 48rem;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  margin-top: 4rem;
  border: 1px solid white !important;

  flex-wrap: wrap;
}
</style>