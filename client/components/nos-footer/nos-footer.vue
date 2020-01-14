<template>
  <footer>
    <button
      @click="$i18n.setLocale('en')"
    >
      English
    </button>

    <span>|</span>

    <button
      @click="$i18n.setLocale('ko')"
    >
      한국어
    </button>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>