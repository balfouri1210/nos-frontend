<template>
  <div class="nos-entry">
    <div class="centered">
      <nuxt-link
        :to="localePath('index')"
        class="nos-entry__logo"
      >
        <img
          src="/logo.svg"
          alt="logo"
        >
      </nuxt-link>

      <nuxt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./_style.scss";
</style>