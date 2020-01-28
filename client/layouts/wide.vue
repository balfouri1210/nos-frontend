<template>
  <div class="nos">
    <v-app>
      <nos-header />
      <nuxt class="nos-layout-wide" />
      <nos-footer />
    </v-app>
  </div>
</template>

<script>
import nosHeader from '@/components/nos-header/nos-header.vue';
import nosFooter from '@/components/nos-footer/nos-footer.vue';

export default {
  components: {
    nosHeader,
    nosFooter
  }
};
</script>

<style lang="scss">
@import "./_style.scss";
</style>