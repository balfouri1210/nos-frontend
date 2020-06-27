<template>
  <nuxt-link
    class="main-event"
    :to="localePath({
      name: 'search',
      query: {
        clubId: 11
      }
    })"
  >
    <img
      src="https://cdn.footystats.org/img/teams/england-liverpool-fc.png"
      alt="emblem"
    >
    <p>Liverpool, 19/20 Champion!</p>
  </nuxt-link>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>