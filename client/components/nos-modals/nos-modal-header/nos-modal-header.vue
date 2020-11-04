<template>
  <div
    class="nos-modal-header"
    :class="{'nos-modal-header--white-tone': $store.getters.getIsModalWhiteTone($route)}"
  >
    <div class="nos-modal-header__logo" />

    <button
      @click="$emit('close-modal')"
    >
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
    height: 24px;
    background-image: url("https://images.907degrees.com/logos/logo_short_white2.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left center;
  }

  button {
    .v-icon {
      vertical-align: top;
      color: white;
    }
  }
}

.nos-modal-header--white-tone {
  .nos-modal-header__logo {
    background-image: url("https://images.907degrees.com/logos/logo_short2.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left center;
  }

  button {
    .v-icon {
      color: black;
    }
  }
}
</style>