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
          <span>2020 © 907DEGREES. All Rights Reserved</span>
          <span style="width: 20px">·</span>
          <nuxt-link :to="localePath('privacy-policy')">
            Privacy
          </nuxt-link>
        </p>
        <p class="footer__contact">
          turtlesng@naver.com
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