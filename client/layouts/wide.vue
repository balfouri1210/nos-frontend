<template>
  <div class="nos">
    <v-app>
      <nos-header @reload="reloadHandler" />

      <nuxt
        v-if="!nuxtCompRerendering"
        class="nos-layout-wide"
      />

      <div
        v-else
        class="nos__progress-circular"
      >
        <v-progress-circular
          :size="50"
          :width="3"
          color="#EB6217"
          indeterminate
        />
      </div>

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

  data() {
    return {
      nuxtCompRerendering: false
    };
  },

  methods: {
    reloadHandler() {
      this.nuxtCompRerendering = true;

      setTimeout(() => {
        this.nuxtCompRerendering = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>