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
          <nuxt-link :to="localePath('about')">
            <v-icon>mdi-party-popper</v-icon>
            환영합니다. 907에 대해 알아보세요
          </nuxt-link>
        </div>

        <div class="onboarding-ui__desc">
          <button @click="closeOnboardingUi">
            괜찮아요, 나중에 볼게요
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