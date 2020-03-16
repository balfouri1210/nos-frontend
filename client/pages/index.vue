<template>
  <div
    id="home"
    class="home"
  >
    <nos-player-list :initial-player-list="initialPlayerList" />
 
    <!-- Nuxt child for player modal -->
    <nuxt-child />
  </div>
</template>

<script>
import Base from '@/page-resources/index/_base';

export default {
  layout: 'wide',

  mixins: [Base],

  async asyncData({ $axios, error }) {
    try {
      const initialPlayerList = await $axios.$get('/api/players');
      return { initialPlayerList };
    } catch (err) {
      console.error(err);
      return error({ statusCode: 500 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/index/_style.scss";
</style>