<template>
  <div class="password-reset">
    <validation-observer v-slot="{ handleSubmit }">
      <form
        id="app"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <div>
          <label for="email">Email</label>
          <nos-input
            id="email"
            type="email"
            name="email"
            outlined
            :rules="'required'"
            :value="email"
            :placeholder="'Email address'"
            :autocomplete="'new password'"
            :disabled="isResetPwdEmailSendCompleted || isResetPwdEmailSendFailed"
            @input="email = $event"
          />
        </div>

        <button
          type="submit"
          class="nos-basic-btn"
          :disabled="isResetPwdEmailSendCompleted || isResetPwdEmailSendFailed"
        >
          <v-progress-circular
            v-if="isResetPwdEmailSending"
            class="centered"
            :size="20"
            :width="3"
            color="white"
            indeterminate
          />

          <span v-else>Send reset password link</span>
        </button>
      </form>
    </validation-observer>

    <div
      v-if="isResetPwdEmailSendCompleted"
      class="password-reset__result"
    >
      <p>
        Thanks! Please check {{ email }} for a link to reset your password.
      </p>
    </div>

    <div
      v-if="isResetPwdEmailSendFailed"
      class="password-reset__result"
    >
      <p>
        Oops! Failed to sending email. Please check the email again or retry after few minutes.
      </p>
    </div>
  </div>
</template>

<script>
import Base from './_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
.password-reset {
  margin-top: 32px;

  ::v-deep input {
    height: 40px;
  }

  .nos-basic-btn {
    margin-top: 12px;
    height: 42px;
  }

  &__result {
    margin-top: 12px;
    text-align: center;
  }
}
</style>