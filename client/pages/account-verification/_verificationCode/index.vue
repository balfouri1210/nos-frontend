<template>
  <div class="account-verification">
    <h1>Welcome to 907DEGREES!</h1>

    <div v-if="isAccountActivated">
      <p>Your account is activated Successfully!</p>

      <nuxt-link
        :to="localePath('index')"
        class="account-verification__link"
      >
        Go to Main
      </nuxt-link>
    </div>

    <div v-if="isAccountActivationFailed">
      <p>Your account is activated already.</p>

      <nuxt-link
        :to="localePath('index')"
        class="account-verification__link"
      >
        Go to Main
      </nuxt-link>
    </div>
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
      isAccountActivationFailed: false
    };
  },

  async mounted() {
    try {
      await this.$axios.put('/api/auth/account-verification', {
        verificationCode: this.verificationCode
      });

      this.isAccountActivated = true;
    } catch (err) {
      if (err.response.data.code === errors.ALREADY_ACTIVATED_USER.code) {
        this.isAccountActivationFailed = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>