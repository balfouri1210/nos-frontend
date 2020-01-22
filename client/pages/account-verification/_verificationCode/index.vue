<template>
  <div class="account-verification">
    <h1>Welcome to 907DEGREES!</h1>

    <p v-if="isAccountActivated">
      Your account is activated Successfully!
    </p>
    <p v-if="isAccountActivationFailed">
      Your account is activated already.
    </p>

    <nuxt-link
      v-if="verificationFinished"
      :to="localePath('index')"
      class="account-verification__link nos-basic-btn"
    >
      Go to Main
    </nuxt-link>
  </div>
</template>

<script>
import { errors } from '@/lib/constants';

export default {
  layout: 'entry',

  data() {
    return {
      verificationCode: this.$route.params.verificationCode,
      isAccountActivated: false,
      isAccountActivationFailed: false,
      verificationFinished: false
    };
  },

  async mounted() {
    try {
      await this.$axios.$put('/api/auth/account-verification', {
        verificationCode: this.verificationCode
      });

      this.isAccountActivated = true;
    } catch (err) {
      if (err.response.code === errors.ALREADY_ACTIVATED_USER.code) {
        this.isAccountActivationFailed = true;
      }
    } finally {
      this.verificationFinished = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>