<template>
  <div class="player-modal">
    <h1 class="centered">
      {{ $t('greeting') }}: {{ $route.params.playerName }}
    </h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>

<i18n>
{
  "en": {
    "greeting": "This is Modal"
  },

  "ko": {
    "greeting": "모달 컴포넌트입니다"
  }
}
</i18n>