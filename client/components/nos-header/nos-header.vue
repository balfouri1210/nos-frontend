<template>
  <header class="nos-header">
    <div class="nos-header__logo">
      <nuxt-link
        :to="localePath('index')"
      >
        <img
          src="/logo.svg"
          alt="logo"
        >
      </nuxt-link>
    </div>

    <div>
      <button
        v-if="!isLoggedIn"
        @click="isLoginModal = !isLoginModal"
      >
        Login
      </button>

      <button
        v-else
        @click="isAccountMenu = !isAccountMenu"
      >
        Account menu
      </button>
    </div>

    <nos-login-modal
      v-if="isLoginModal"
      @closeLoginModal="closeLoginModal"
    />

    <nos-account-menu-modal
      v-if="isAccountMenu"
      @closeAccountMenuModal="closeAccountMenuModal"
    />
  </header>
</template>

<script>
import Base from './_base';
import nosLoginModal from '@/components/nos-login-modal/nos-login-modal.vue';
import nosAccountMenuModal from '@/components/nos-account-menu-modal/nos-account-menu-modal.vue';

export default {
  components: {
    nosLoginModal,
    nosAccountMenuModal
  },

  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>