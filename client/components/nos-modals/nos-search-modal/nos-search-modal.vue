<template>
  <div
    class="nos-search-modal"
  >
    <div class="nos-search-modal__inner">
      <input
        v-model="searchKeyword"
        type="text"
      >
      <button
        class="nos-basic-btn"
        @click="search"
      >
        SEARCH
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: null
    };
  },

  methods: {
    search() {
      const searchResult = this.$axios.$get(
        `/api/search/${this.searchKeyword}`
      );
      console.log(searchResult);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>