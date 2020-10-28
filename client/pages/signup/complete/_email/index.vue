<template>
  <div class="signup-complete">
    <v-icon>mdi-checkbox-marked-circle-outline</v-icon>

    <h1>You've been signed up succeessfully!</h1>
    <span>Please verify your email address</span>
    <span style="color: #EB6217">
      {{ $route.params.email }}
    </span>
    <span>by clicking on the verification link sent to your inbox.</span>

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
      <span
        v-else
        style="font-weight: 400"
      >
        Resend verification email
      </span>
    </button>
  </div>
</template>

<script>
import Base from '@/page-resources/signup-complete/_base';

export default {
  layout: 'entry',
  mixins: [Base]
};
</script>

<style lang="scss">
.signup-complete {
  margin-top: 32px;
  text-align: center;

  h1, span {
    font-weight: 300;
  }

  h1 { margin-bottom: 14px; font-size: 20px; }
  span { display: block; font-size: 15px; }

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