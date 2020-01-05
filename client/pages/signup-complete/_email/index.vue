<template>
  <div class="signup-complete">
    <h1>You've been signed up succeessfully!</h1>
    <h1>Please activate your account by email</h1>

    <button
      class="nos-basic-btn"
      @click="sendVerificationMailAgain"
    >
      Send verification email again
    </button>
  </div>
</template>

<script>
import Base from './_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss">
</style>