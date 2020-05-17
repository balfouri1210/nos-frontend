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
            :autocomplete="'new-password'"
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

    <transition
      name="fade"
    >
      <div
        v-show="userNotFound"
        class="password-reset__error-message"
      >
        <i class="material-icons password-reset__error-icon">error</i>

        <p>There isn’t an account associated with this email address.</p>

        <div>
          <button
            class="password-reset__error-close"
            @click="userNotFound = null"
          >
            <i
              class="material-icons"
            >close</i>
          </button>
        </div>
      </div>
    </transition>

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
import Base from '@/page-resources/password-reset/_base';

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

  &__error-message {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 6px;
    padding: 7px 6px;
    border-radius: 6px;
    background: darkred;
    color: white;
    font-size: 14px;

    button {
      display: flex;
      padding: 0;
    }

    i {
      margin-top: 3px;
    }
  }

  &__error-icon {
    margin-right: 4px;
  }

  &__error-close {
    background: none !important;

    i {
      color: white;
    }
  }
}
</style>