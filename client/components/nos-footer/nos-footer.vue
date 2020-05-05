<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__left">
        <div class="footer__logo">
          <nuxt-link
            :to="localePath('index')"
          />
        </div>
      </div>

      <div class="footer__right">
        <!-- <button
          @click="$i18n.setLocale('en')"
        >
          English
        </button>

        <span>|</span>

        <button
          @click="$i18n.setLocale('ko')"
        >
          한국어
        </button> -->

        <p class="footer__copyright">
          2020 © 907DEGREES. All Rights Reserved.
        </p>
        <p class="footer__contact">
          907degrees@gmail.com
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>