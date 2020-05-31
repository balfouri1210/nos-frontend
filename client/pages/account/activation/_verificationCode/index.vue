<template>
  <div class="account-activation">
    <div v-if="isAccountActivated">
      <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
      <h1>Thanks for join us!</h1>
      <p>Your account has been activated Successfully!</p>
    </div>

    <div v-if="isAccountAlreadyActivated">
      <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
      <p>This account has already been activated.</p>
    </div>
    
    <p v-if="isAccountActivationFailed">
      Sorry, this account doesn't belong to an user database or this email is expired. Please check again or contact us.
    </p>

    <nuxt-link
      v-if="activationFinished"
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