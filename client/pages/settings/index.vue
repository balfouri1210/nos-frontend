<template>
  <div class="settings">
    <!-- PROFILE -->
    <div class="settings__content">
      <div class="settings__profile">
        <div class="settings__profile-title">
          <h1>Profile</h1>

          <v-chip
            v-if="!isProfileUpdating && isProfileUpdateFailed"
            color="red darken-3"
            outlined
          >
            <v-icon left>
              mdi-alert-circle
            </v-icon>
            Update Failed
          </v-chip>
        </div>

        <div
          v-if="isProfileUpdateCompleted"
          class="settings__update-completed"
        >
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          <p>Your profile is updated successfully!</p>
        </div>

        <validation-observer
          v-else
          v-slot="{ handleSubmit, pristine, invalid }"
          ref="profileForm"
        >
          <form
            id="app"
            @submit.prevent="handleSubmit(updateProfile)"
          >
            <div class="settings__item">
              <label
                for="username"
                class="settings__label"
              >Username</label>
              <nos-input
                id="username"
                type="text"
                name="username"
                outlined
                :rules="'required|min:2|max:30|alpha_dash|available_username'"
                :value="userInfo.username"
                :debounce="400"
                :autocomplete="'off'"
                @input="userInfo.username = $event"
              />
            </div>

            <div class="settings__item">
              <label
                for="country"
                class="settings__label"
              >Country</label>
              <nos-select
                id="countryId"
                name="country"
                outlined
                :options="countries"
                :rules="'required'"
                :value="userInfo.countryId"
                @input="userInfo.countryId = $event"
              />
            </div>

            <div>
              <button
                type="submit"
                class="nos-basic-btn"
                :disabled="pristine || invalid"
              >
                <v-progress-circular
                  v-if="isProfileUpdating"
                  class="centered"
                  :size="20"
                  :width="3"
                  color="white"
                  indeterminate
                />
                <span v-else>Update</span>
              </button>

              <p
                v-if="!isProfileUpdating && isProfileUpdateFailed"
                class="settings__failed"
              >
                * You can update your profile 30days after last update.
              </p>
            </div>
          </form>
        </validation-observer>
      </div>


      <!-- PASSWORD -->
      <div class="settings__password">
        <div class="settings__password-title">
          <h1>Password</h1>

          <v-chip
            v-if="!isPasswordUpdating && isPasswordUpdateFailed"
            color="red darken-3"
            outlined
          >
            <v-icon left>
              mdi-alert-circle
            </v-icon>
            Update Failed
          </v-chip>
        </div>

        <div
          v-if="isPasswordUpdateCompleted"
          class="settings__update-completed"
        >
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          <p>Your password is updated successfully!</p>
        </div>


        <validation-observer
          v-else
          v-slot="{ handleSubmit, invalid }"
          ref="passwordForm"
        >
          <div class="settings__item">
            <label
              for="newPassword"
              class="settings__label"
            >Old Password</label>

            <nos-input
              id="oldPassword"
              type="password"
              name="oldPassword"
              outlined
              :placeholder="'******'"
              :rules="'required|min:6'"
              :value="userInfo.oldPassword"
              @input="userInfo.oldPassword = $event"
            />
          </div>

          <div class="settings__item">
            <label
              for="newPassword"
              class="settings__label"
            >New Password</label>

            <nos-input
              id="newPassword"
              type="password"
              name="newPassword"
              outlined
              :placeholder="'******'"
              :rules="'required|min:6'"
              :value="userInfo.newPassword"
              @input="userInfo.newPassword = $event"
            />
          </div>

          <div class="settings__item">
            <label
              for="confirmNewPassword"
              class="settings__label"
            >Confirm New Password</label>
            <nos-input
              id="confirmNewPassword"
              type="password"
              name="confirmNewPassword"
              outlined
              :placeholder="'******'"
              :rules="{ required: true, is: userInfo.newPassword }"
              :value="userInfo.confirmNewPassword"
              @input="userInfo.confirmNewPassword = $event"
            />
          </div>

          <button
            class="nos-basic-btn"
            :disabled="invalid || !userInfo.oldPassword"
            @click="updatePassword"
          >
            <v-progress-circular
              v-if="isPasswordUpdating"
              class="centered"
              :size="20"
              :width="3"
              color="white"
              indeterminate
            />
            <span v-else>Reset Password</span>
          </button>

          <p
            v-if="!isPasswordUpdating && isPasswordUpdateFailed"
            class="settings__failed"
          >
            * Old password is invalid. Please check again.
          </p>
        </validation-observer>
      </div>

      <div class="settings__delete-account">
        <div class="settings__delete-account-title">
          <h1>Delete Account</h1>
          <p>When you press the button below, your comments, replies, likes and all other data will be removed permanently and will not be recoverable.</p>
        </div>

        <button
          v-if="!isDeleteForm"
          @click="isDeleteForm = true"
        >
          Delete '{{ getEmail() }}' Account
        </button>

        <validation-observer
          v-if="isDeleteForm"
          v-slot="{ handleSubmit, invalid }"
          ref="deleteAccountForm"
        >
          <div class="settings__item">
            <label
              for="newPassword"
              class="settings__label"
            >Current Password</label>

            <nos-input
              id="currentPassword"
              type="password"
              name="currentPassword"
              outlined
              :placeholder="'******'"
              :rules="'required'"
              :value="currentPassword"
              @input="currentPassword = $event"
            />
          </div>

          <button
            :disabled="invalid"
            @click="deleteAccount"
          >
            <v-progress-circular
              v-if="isAccountDeleting"
              class="centered"
              :size="20"
              :width="3"
              color="white"
              indeterminate
            />
            <span v-else>Permanently delete my account</span>
          </button>

          <p
            v-if="!isAccountDeleting && isAccountDeleteFailed"
            class="settings__failed"
          >
            * Old password is invalid or there is problem to delete account. Please check again or contact us.
          </p>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import Base from '@/page-resources/settings/_base';

export default {
  middleware: 'authenticated',
  mixins: [Base],

  async asyncData({ $axios, store }) {
    try {
      const user = await $axios.$get(
        `/api/users/${store.getters['auth/getId']}`
      );
      const userInfo = {
        username: user.username,
        countryId: user.country_id,
        oldPassword: null,
        newPassword: null,
        confirmNewPassword: null
      };
      return { userInfo };
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/settings/_style.scss";
</style>