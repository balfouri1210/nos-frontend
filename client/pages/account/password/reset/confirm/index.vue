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
                :rules="'required|min:6'"
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
        <p>비밀번호가 성공적으로 변경되었습니다</p>
        <p>새로운 비밀번호로 로그인해주세요</p>

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
        FAILED!
      </div>
    </div>

    <div v-else>
      <p>죄송합니다. 존재하지 않는 계정이거나 설정 과정에서 문제가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요. 문제가 지속된다면 support@907degrees.com으로 연락하세요</p>
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
  }

  ::v-deep input {
    border-bottom: 1px solid black;
  }
}
</style>