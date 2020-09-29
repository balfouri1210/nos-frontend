<template>
  <div class="nos">
    <v-app>
      <nos-header />
      <nuxt class="nos-layout-default" />
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
  },

  mounted() {
    if (navigator) {
      window.addEventListener('resize', function() {
        if (document.activeElement.tagName=='INPUT' || document.activeElement.tagName=='TEXTAREA') {
          window.setTimeout(function() {
            document.activeElement.scrollIntoViewIfNeeded();
          },0);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>