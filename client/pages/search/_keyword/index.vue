<template>
  <div class="search">
    <nos-player-list :initial-player-list="searchResult" />

    <!-- Nuxt child for player modal -->
    <!-- <nuxt-child /> -->
  </div> 
</template>

<script>
import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';

export default {
  layout: 'wide',

  components: {
    nosPlayerList
  },

  // async asyncData({ $axios, error, params }) {
  //   try {
  //     const searchResult = $axios.$get(`/api/search/${params.searchKeyword}`);

  //     return { searchResult };
  //   } catch (err) {
  //     console.error(err);
  //     error({ statusCode: 500 });
  //   }
  // }

  mounted() {
    console.log('search page');
  }
};
</script>

<style>
</style>