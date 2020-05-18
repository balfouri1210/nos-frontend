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

      <div class="onboarding-ui__desc-wrapper">
        <div class="onboarding-ui__desc">
          <nuxt-link
            :to="localePath('about')"
            @click.native="closeOnboardingUi"
          >
            <v-icon>mdi-party-popper</v-icon>
            Welcome! Find out about 907Degrees
          </nuxt-link>
        </div>

        <div class="onboarding-ui__desc">
          <button @click="closeOnboardingUi">
            It's ok, Later
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