<template>
  <div class="nos-default-modal">
    <div class="nos-default-modal__left">
      <img
        :src="'https://images.907degrees.com/logos/logo_short_black.svg'"
        alt="logo"
      >
    </div>

    <div class="nos-default-modal__right">
      <slot />
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.nos-default-modal {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: white;
  box-shadow: 1px 2px 10px 1px rgba(0, 0, 0, 0.15);

  &__left {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 20;
    background: $nos-main-gradient;

    img {
      width: 40px;
    }
  }

  &__right {
    flex: 80;
  }
}

@media screen and (min-width: $mobile-width) {
  .nos-default-modal {
    &__left {
      img {
        width: 60px;
      }
    }
  }
}
</style>