<template>
  <div class="password-reset-confirm">
    <div v-if="verificationResult">
      <div v-if="!isPasswordResetCompleted">
        <validation-observer v-slot="{ handleSubmit, invalid }">
          <form
            id="app"
            @submit.prevent="handleSubmit(resetPassword)"
          >
            <div>
              <label
                for="newPassword"
                class="password-reset-confirm__label"
              >New Password</label>
              <nos-input
                id="newPassword"
                type="password"
                name="newPassword"
                :placeholder="'******'"
                :rules="'required|min:8'"
                :value="newPassword"
                @input="newPassword = $event"
              />
            </div>

            <div>
              <label
                for="confirmNewPassword"
                class="password-reset-confirm__label"
              >Confirm New Password</label>
              <nos-input
                id="confirmNewPassword"
                type="password"
                name="confirmNewPassword"
                :placeholder="'******'"
                :rules="{ required: true, is: newPassword }"
                :value="confirmNewPassword"
                @input="confirmNewPassword = $event"
              />
            </div>

            <button
              type="submit"
              class="nos-basic-btn"
              :disabled="invalid"
            >
              <v-progress-circular
                v-if="isPasswordResetting"
                class="centered"
                :size="20"
                :width="3"
                color="white"
                indeterminate
              />
              <span v-else>Reset Password</span>
            </button>
          </form>
        </validation-observer>
      </div>

      <div
        v-if="isPasswordResetCompleted"
        class="password-reset-confirm__complete"
      >
        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        <p>Your password has been changed successfully.</p>
        <p>Please sign in with your new password.</p>

        <nuxt-link
          :to="localePath('login')"
          class="nos-basic-btn"
        >
          Go to Login
        </nuxt-link>
      </div>

      <div
        v-if="isPasswordResetFailed"
        class="password-reset-confirm__complete"
      >
        Sorry, looks like we’re having some issues :( Please try again.
      </div>
    </div>

    <div v-else>
      <p>
        Sorry, the account does not exist or there was a problem with the set up process.
        Please refresh the page or try it later. If the error continues, please contact us
        <a href="mailto: support@907degrees.com"> support@907degrees.com</a>
      </p>

      <nuxt-link
        :to="localePath('index')"
        class="password-reset-confirm__link nos-basic-btn"
      >
        Go Home
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Base from '@/page-resources/password-reset-confirm/_base';

export default {
  layout: 'entry',
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
.password-reset-confirm {
  margin-top: 32px;

  &__complete,
  &__failed {
    text-align: center;
  }

  .v-icon {
    margin-bottom: 16px;
    font-size: 46px;
    color: $nos-main-theme;
  }

  p {
    font-size: 16px;
    text-align: center;
  }

  .nos-basic-btn {
    display: inline-block;
    margin-top: 24px;
    height: 40px;
  }

  ::v-deep input {
    border-bottom: 1px solid black;
  }

  &__link {
    display: inline-block;
    margin-top: 32px;
    padding: 12px 32px;
  }
}
</style>