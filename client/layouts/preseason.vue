<template>
  <div class="nos">
    <v-app>
      <nos-header />
      <nuxt class="nos-layout-preseason" />
    </v-app>
  </div>
</template>

<script>
import nosHeader from '@/components/nos-header/nos-header.vue';

export default {
  components: {
    nosHeader
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>