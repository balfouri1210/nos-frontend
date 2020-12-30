<template>
  <header>
    <div
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
            <button @click="goToHome" />
          </div>

          <nuxt-link :to="localePath('about')">
            <v-chip
              color="primary"
              outlined
              small
              style="cursor: pointer"
            >
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
            ref="account-menu-button"
            @click="toggleNavigation"
          >
            <v-icon>mdi-menu</v-icon>
          </button>
        </div>

        <!-- ASSISTANT MODALS -->
        <nos-login-modal
          v-if="isLoginModal"
          v-click-outside="clickOutsideHandler"
          @loginSuccess="loginSuccessHandler"
          @close-modal="isLoginModal = false"
        />

        <nos-notification-modal
          v-if="isNotificationModal"
          v-click-outside="clickOutsideHandler"
          @close-modal="isNotificationModal = false"
        />

        <!-- DESKTOP NAVIGATION -->
        <nos-navigation-desktop
          v-if="isNavigationDesktop"
          v-click-outside="clickOutsideHandler"
          @logoutSuccess="logoutSuccessHandler"
          @close="isNavigationDesktop = false"
        />
      </div>
    </div>

    <!-- SEARCH MODAL -->
    <nos-search-modal
      v-if="isSearchModal"
      v-click-outside="clickOutsideHandler"
      @close-modal="isSearchModal = false"
    />

    <!-- MOBILE NAVIGATION -->
    <nos-navigation-mobile
      :is-open="isNavigationMobile"
      @close="isNavigationMobile = false"
    />
  </header>
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