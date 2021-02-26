<template>
  <div class="account-activation">
    <div v-if="isAccountActivated">
      <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
      <h1>Welcome!</h1>
      <span>Your account has been activated Successfully!</span>
    </div>

    <div v-if="isAccountAlreadyActivated">
      <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
      <span>This account has already been activated.</span>
    </div>

    <div v-if="isAccountActivationFailed">
      <h1>Activation Failed</h1>
      <span>Sorry, this account doesn't belong to an user database or this verification code has been expired. Please check again or contact us.</span>
    </div>

    <nuxt-link
      v-if="activationFinished"
      :to="localePath('index')"
      class="account-activation__link nos-basic-btn"
    >
      Go Home
    </nuxt-link>

    <a
      v-if="isAccountActivationFailed"
      href="mailto:support@907degrees.com"
      class="account-activation__mailto"
    >Contact Us</a>
  </div>
</template>

<script>
import Base from '@/page-resources/account-activation/_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/account-activation/_style.scss";
</style>