<template>
  <div class="signup-complete">
    <v-icon>mdi-checkbox-marked-circle-outline</v-icon>

    <h1>You've been signed up succeessfully!</h1>
    <p>Please activate your account through the link in Email.</p>

    <button
      class="nos-basic-btn"
      :disabled="signupEmailResending"
      @click="sendVerificationMailAgain"
    >
      <v-progress-circular
        v-if="signupEmailResending"
        class="centered"
        :size="24"
        :width="2"
        color="rgb(255, 255, 255)"
        indeterminate
      />
      <span v-else>
        Resend verification email
      </span>
    </button>
  </div>
</template>

<script>
import Base from './_base';

export default {
  layout: 'entry',
  mixins: [Base]
};
</script>

<style lang="scss">
.signup-complete {
  margin-top: 32px;
  text-align: center;

  .v-icon {
    margin-bottom: 16px;
    color: $nos-main-theme;
    font-size: 46px;
  }

  .nos-basic-btn {
    display: inline-block;
    margin-top: 32px;
    padding: 0 12px;
    height: 40px;
  }
}
</style>