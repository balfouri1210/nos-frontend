<template>
  <footer>
    <button
      @click="changeLocale('en')"
    >
      English
    </button>

    <span>|</span>

    <button
      @click="changeLocale('ko')"
    >
      한국어
    </button>
  </footer>
</template>

<script>
export default {
  methods: {
    changeLocale(locale) {
      this.$i18n.setLocale(locale);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>