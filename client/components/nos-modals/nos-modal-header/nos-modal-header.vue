<template>
  <div
    class="nos-modal-header"
    :class="{'nos-modal-header--greyscale': isGreyScale}"
  >
    <img
      v-if="!isGreyScale"
      class="nos-modal-header__logo"
      src="https://images.907degrees.com/logos/logo_short_white2.svg"
      alt="logo"
    >

    <img
      v-else
      class="nos-modal-header__logo"
      src="https://images.907degrees.com/logos/logo_short2.svg"
      alt="logo"
    >

    <button
      @click="$emit('closeModal')"
    >
      <v-icon>mdi-close</v-icon>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    isGreyScale() {
      return (
        this.$store.getters.getAppStatus === 'preseason' &&
        this.$route.name.indexOf('index') !== -1
      );
    }
  }
};
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

.nos-modal-header--greyscale {
  button {
    .v-icon {
      color: black;
    }
  }
}
</style>