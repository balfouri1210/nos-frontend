<template>
  <div class="signup">
    {{ $t('signup') }}

    <validation-observer v-slot="{ handleSubmit }">
      <form
        id="app"
        action="https://vuejs.org/"
        method="post"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <div>
          <label for="email">Email</label>
          <nos-input
            id="email"
            type="email"
            name="email"
            :rules="'required'"
            :value="userInfo.email"
            @input="userInfo.email = $event"
          />
        </div>

        <div>
          <label for="password">Password</label>
          <nos-input
            id="password"
            type="password"
            name="password"
            :rules="'required|min:8'"
            :value="userInfo.password"
            @input="userInfo.password = $event"
          />
        </div>

        <div>
          <label for="confirmPassword">Confirm Password</label>
          <nos-input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            :rules="{ required: true, is: userInfo.password }"
            :value="userInfo.confirmPassword"
            @input="userInfo.confirmPassword = $event"
          />
        </div>

        <div>
          <label for="username">Username</label>
          <nos-input
            id="username"
            type="text"
            name="username"
            :rules="'required|min:4'"
            :value="userInfo.username"
            @input="userInfo.username = $event"
          />
        </div>

        <div>
          <label for="birth">Birth</label>
          <client-only>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="birth"
            >
              <div class="signup__datepicker">
                <datepicker
                  v-model="userInfo.birth"
                  :format="'MMM dd, yyyy'"
                  placeholder="Select date of birth"
                />

                <p class="signup__datepicker-error-message">
                  {{ errors[0] }}
                </p>
              </div>
            </validation-provider>
          </client-only>
        </div>

        <div>
          <label for="gender">Gender</label>
          <nos-select
            id="gender"
            name="gender"
            :options="['male', 'female']"
            :rules="'required'"
            :value="userInfo.gender"
            @input="userInfo.gender = $event"
          />
        </div>

        <div>
          <label for="country">Country</label>
          <nos-select
            id="countryId"
            name="countryId"
            :options="countries"
            :rules="'required'"
            :value="userInfo.countryId"
            @input="userInfo.countryId = $event"
          />
        </div>

        <div>
          <button
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </validation-observer>
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

<i18n>
{
  "en": {
    "signup": "Signup"
  },

  "ko": {
    "signup": "회원가입"
  }
}
</i18n>

