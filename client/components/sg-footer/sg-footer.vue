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
  methods: {
    changeLocale(locale) {
      this.$i18n.setLocale(locale);
    }
  }
};
</script>

<style lang="scss">
footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: $mobile-footer-height;
  background: rgba(0, 0, 0, 0.8);
}

@media only screen and (min-width: $mobile-width) {
  footer {
    height: $web-footer-height;
  }
}
</style>