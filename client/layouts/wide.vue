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

  // mounted() {
  //   // 解决ios丢失上一级url问题
  //   window.history.replaceState(
  //     null,
  //     null,
  //     `${this.$router.options.base}${this.$route.fullPath}`.replace(
  //       /\/\//g,
  //       '/'
  //     )
  //   );
  // }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>