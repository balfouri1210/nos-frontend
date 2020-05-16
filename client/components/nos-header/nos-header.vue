<template>
  <header
    class="nos-header"
    :class="{
      'nos-header--preseason':
        $store.getters.getAppStatus === 'preseason'
        && $route.name.indexOf('index') !== -1
    }"
  >
    <div class="nos-header__content">
      <div class="nos-header__left">
        <div class="nos-header__logo">
          <nuxt-link
            :to="localePath('index')"
          />
        </div>

        <nuxt-link :to="localePath('about')">
          <v-chip
            color="primary"
            outlined
            small
            style="cursor: pointer"
          >
            <v-icon left>
              mdi-information-outline
            </v-icon>
            About 907
          </v-chip>
        </nuxt-link>
      </div>

      <div class="nos-header__right">
        <button
          v-if="isLoggedIn"
          ref="notification-button"
          class="nos-header__notification-btn"
          @click="isNotificationModal = true"
        >
          <!-- Normal Bell -->
          <v-icon
            v-if="getUnreadNotificationCount() === 0"
          >
            mdi-bell
          </v-icon>

          <!-- Accented Bell (New noti) -->
          <v-badge
            v-if="getUnreadNotificationCount() > 0"
            left
            overlap
            color="white"
          >
            <span slot="badge">{{ getUnreadNotificationCount() }}</span>
            <v-icon class="nos-header--accented">
              mdi-bell
            </v-icon>
          </v-badge>
        </button>

        <nuxt-link :to="localePath('histories')">
          <button>
            <v-icon>mdi-history</v-icon>
          </button>
        </nuxt-link>

        <button
          ref="search-button"
          @click="isSearchModal = !isSearchModal"
        >
          <v-icon>mdi-magnify</v-icon>
        </button>

        <button
          v-if="!isLoggedIn"
          ref="login-button"
          @click="isLoginModal = true"
        >
          <v-icon>mdi-login-variant</v-icon>
        </button>

        <button
          v-if="isLoggedIn"
          ref="account-menu-button"
          @click="isAccountMenuModal = true"
        >
          <v-icon>mdi-account-circle</v-icon>
        </button>
      </div>

      <nos-login-modal
        v-if="isLoginModal"
        v-click-outside="clickOutsideHandler"
        @loginSuccess="loginSuccessHandler"
        @closeModal="isLoginModal = false"
      />

      <nos-account-menu-modal
        v-if="isAccountMenuModal"
        v-click-outside="clickOutsideHandler"
        @logoutSuccess="logoutSuccessHandler"
        @closeModal="isAccountMenuModal = false"
      />

      <nos-notification-modal
        v-if="isNotificationModal"
        v-click-outside="clickOutsideHandler"
        @closeModal="isNotificationModal = false"
      />
    </div>

    <nos-search-modal
      v-if="isSearchModal"
      v-click-outside="clickOutsideHandler"
      @closeModal="isSearchModal = false"
    />
  </header>
</template>

<script>
import Base from './_base';
import nosLoginModal from '@/components/nos-modals/nos-login-modal/nos-login-modal.vue';
import nosAccountMenuModal from '@/components/nos-modals/nos-account-menu-modal/nos-account-menu-modal.vue';
import nosNotificationModal from '@/components/nos-modals/nos-notification-modal/nos-notification-modal.vue';
import nosSearchModal from '@/components/nos-modals/nos-search-modal/nos-search-modal.vue';

export default {
  components: {
    nosLoginModal,
    nosAccountMenuModal,
    nosNotificationModal,
    nosSearchModal
  },

  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>