<template>
  <div class="account-activation">
    <div v-if="isAccountActivated">
      <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
      <h1>Thanks for join us!</h1>
      <p>Your account is activated Successfully!</p>
    </div>

    <div v-if="isAccountAlreadyActivated">
      <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
      <p>Your account is activated already.</p>
    </div>
    
    <p v-if="isAccountActivationFailed">
      Sorry, this user is not registered or this email is expired. Please check again or contact us.
    </p>

    <nuxt-link
      v-if="verificationFinished"
      :to="localePath('index')"
      class="account-activation__link nos-basic-btn"
    >
      Go Home
    </nuxt-link>
  </div>
</template>

<script>
import { errors } from '@/lib/constants';

export default {
  layout: 'entry',

  async asyncData({ $axios, route }) {
    let isAccountActivated,
      isAccountAlreadyActivated,
      isAccountActivationFailed,
      verificationFinished;
    try {
      await $axios.$put('/api/auth/account-activation', {
        verificationCode: route.params.verificationCode
      });

      isAccountActivated = true;
    } catch (err) {
      switch (err.response.data.code) {
      case errors.ALREADY_ACTIVATED_USER.code:
        isAccountAlreadyActivated = true;
        break;

      case errors.USER_NOT_FOUND.code:
        isAccountActivationFailed = true;
        break;
      }
    } finally {
      verificationFinished = true;
    }

    return {
      isAccountActivated,
      isAccountAlreadyActivated,
      isAccountActivationFailed,
      verificationFinished
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>