<template>
  <div class="nos-modal-header">
    <img
      class="nos-modal-header__logo"
      src="/logo_short_white2.svg"
      alt="logo"
    >

    <button @click="$emit('closeModal')">
      <v-icon>mdi-close</v-icon>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nos-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__logo {
    width: 40px;
  }

  button {
    .v-icon {
      vertical-align: top;
      color: white;
    }
  }
}
</style>