<template>
  <div class="nos-account-menu-modal">
    <button @click="logout">
      Logout
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.$logout();
      this.$emit('closeAccountMenuModal');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>