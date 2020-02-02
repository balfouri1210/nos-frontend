<template>
  <div
    class="nos-request-login-popup__backdrop"
  >
    <button
      class="nos-request-login-popup__close-btn"
      @click="closePopup"
    >
      <v-icon>mdi-close</v-icon>
    </button>

    <div
      class="nos-request-login-popup__content centered"
    >
      <img
        src="/logo_white2.svg"
        alt="logo"
      >

      <div>
        <nuxt-link
          class="nos-request-login-popup__login-btn nos-basic-btn"
          :to="localePath('login')"
        >
          <span>Login</span>
        </nuxt-link>
      </div>

      <div>
        <nuxt-link
          class="nos-basic-outlined-btn"
          :to="localePath('signup')"
        >
          Signup
        </nuxt-link>
      </div>

      <div>
        <button
          class="nos-request-login-popup__do-it-later"
          @click="closePopup"
        >
          I'll do it later
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closePopup() {
      this.$emit('closeRequestLoginPopup');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>