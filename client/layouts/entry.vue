<template>
  <div class="nos-entry">
    <v-app>
      <div class="nos-entry__inner">
        <nuxt-link
          class="nos-entry__go-back"
          :to="localePath('index')"
        >
          <v-chip
            color="#f4991e"
            text-color="#f4991e"
            outlined
            :ripple="true"
          >
            Go Home
          </v-chip>
        </nuxt-link>

        <nuxt-link
          :to="localePath('index')"
          class="nos-entry__logo"
        >
          <img
            src="https://images.907degrees.com/logos/logo2.svg"
            alt="logo"
          >
        </nuxt-link>
      </div>

      <nos-footer />
    </v-app>
  </div>
</template>

<script>
import nosFooter from '@/components/nos-footer/nos-footer.vue';

export default {
  components: {
    nosFooter
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>