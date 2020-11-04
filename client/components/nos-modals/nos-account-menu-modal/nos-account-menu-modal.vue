<template>
  <div
    class="nos-modal nos-account-menu-modal"
    :class="{'nos-modal--white-tone': $store.getters.getIsModalWhiteTone($route)}"
  >
    <nos-modal-header @close-modal="$emit('close-modal')" />

    <div class="nos-modal__body">
      <button
        class="nos-modal__button"
        @click="goToSettings"
      >
        Settings
      </button>

      <button
        class="nos-modal__button"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import nosModalHeader from '../nos-modal-header/nos-modal-header.vue';

export default {
  components: {
    nosModalHeader
  },

  methods: {
    logout() {
      this.$store.$logout();
      this.$emit('logoutSuccess');
      this.$router.push(this.localePath('index'));
    },

    goToSettings() {
      this.$emit('close-modal');
      this.$router.push(this.localePath('settings'));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../_modal-common-style.scss";
@import "./_style.scss";
</style>