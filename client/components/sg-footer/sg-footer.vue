<template>
  <footer>
    <button
      @click="changeLocale('en')"
    >
      English
    </button>

    <button
      @click="changeLocale('ko')"
    >
      한국어
    </button>
  </footer>
</template>

<script>
export default {
  mounted() {
    console.log(this.$i18n);
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.setLocale(locale);
    }
  }
};
</script>

<style>
</style>