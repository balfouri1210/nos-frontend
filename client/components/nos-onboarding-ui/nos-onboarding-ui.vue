<template>
  <div
    v-if="isOnboarding"
    class="onboarding-ui"
  >
    <div class="onboarding-ui__content centered">
      <img
        src="https://images.907degrees.com/logos/logo_white2.svg"
        alt="logo"
      >

      <p class="onboarding-ui__title">
        <v-icon>mdi-party-popper</v-icon>
        Welcome! 907Degrees is a community designed for the football fans to explore their interest for the players on a weekly basis.
      </p>

      <div class="onboarding-ui__desc-wrapper">
        <div class="onboarding-ui__desc">
          <nuxt-link
            :to="localePath('about')"
            @click.native="closeOnboardingUi"
          >
            Learn more about 907Degrees
          </nuxt-link>
        </div>

        <div class="onboarding-ui__desc">
          <button @click="closeOnboardingUi">
            I'm good, I’ll try it later
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOnboarding: false
    };
  },

  mounted() {
    if (!window.localStorage.getItem('nosFirstVisit')) this.isOnboarding = true;
  },

  methods: {
    closeOnboardingUi() {
      this.isOnboarding = false;
      window.localStorage.setItem('nosFirstVisit', false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>