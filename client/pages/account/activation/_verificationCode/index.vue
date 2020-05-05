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
import Base from '@/page-resources/account-activation/_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/account-activation/_style.scss";
</style>