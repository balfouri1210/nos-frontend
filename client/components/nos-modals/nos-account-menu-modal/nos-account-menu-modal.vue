<template>
  <div class="nos-account-menu-modal">
    <nos-default-modal>
      <div class="nos-account-menu-modal__content">
        <button
          class=""
          @click="goToSettings"
        >
          Settings
        </button>

        <button
          class=""
          @click="logout"
        >
          Logout
        </button>
      </div>
    </nos-default-modal>
  </div>
</template>

<script>
import nosDefaultModal from '../nos-default-modal/nos-default-modal.vue';

export default {
  components: {
    nosDefaultModal
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