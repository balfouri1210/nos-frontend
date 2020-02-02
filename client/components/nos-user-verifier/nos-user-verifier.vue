<template>
  <div class="nos-user-verifier">
    <p class="nos-user-verifier__desc">
      We sent verification code to
      <span>{{ getEmail() }}</span>.
      Check Email and write the code below.
    </p>

    <validation-observer v-slot="{ handleSubmit }">
      <form
        id="app"
        @submit.prevent="handleSubmit(verifyCode)"
      >
        <div>
          <div class="nos-user-verifier__expiration">
            <label for="verificationCode">Verification Code</label>

            <p
              v-if="!isVerificationCodeExpired"
              class="nos-user-verifier__expiration-timer"
            >
              <countdown
                :time="expirationTime"
                :interval="1000"
                tag="p"
                @end="isVerificationCodeExpired = true"
              >
                <template slot-scope="props">
                  Expiration in <span>{{ props.minutes }} : {{ props.seconds }}</span>
                </template>
              </countdown>
            </p>
          </div>

          <p
            v-if="isVerificationCodeExpired"
            class="nos-user-verifier__expiration-timer"
          >
            Verification Code is Expired. Please send the code again.
          </p>

          <nos-input
            id="verificationCode"
            type="tel"
            name="verificationCode"
            :placeholder="'Code'"
            :rules="'required|length:6'"
            :value="verificationCode"
            :disabled="isVerificationCodeExpired"
            @input="verificationCode = $event"
          />
        </div>

        <div>
          <button
            type="submit"
            class="nos-basic-btn"
          >
            <v-progress-circular
              v-if="isLoading"
              class="centered"
              :size="20"
              :width="2"
              color="rgb(255, 255, 255)"
              indeterminate
            />
            <span v-else>Verify code</span>
          </button>
        </div>
      </form>
    </validation-observer>

    <hr>

    <button
      class="nos-basic-outlined-btn"
      @click="reSendVerificationCode"
    >
      <v-progress-circular
        v-if="isVerificationCodeSending"
        class="centered"
        :size="20"
        :width="2"
        color="black"
        indeterminate
      />
      <span v-if="!isVerificationCodeSending">Resend Verification Code</span>
    </button>
  </div>
</template>

<script>
import Base from './_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>