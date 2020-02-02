<template>
  <div class="nos-modal nos-account-menu-modal">
    <nos-modal-header @closeModal="$emit('closeModal')" />

    <div class="nos-modal__body">
      <button @click="goToSettings">
        Settings
      </button>

      <button @click="logout">
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
      this.$emit('closeModal');
      this.$router.push(this.localePath('settings'));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../_modal-common-style.scss";
@import "./_style.scss";
</style>