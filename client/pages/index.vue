<template>
  <div class="home">
    <h1>This is 907Degrees. by Balfouri</h1>
    <h1>CURRENT STAGE IS <span style="color: orange">'{{ stage }}'</span></h1>

    <div
      v-if="getJwt()"
      style="color: hotpink"
    >
      Hello, {{ getUsername() }}
    </div>

    <div>
      {{ $t('greeting') }}
    </div>

    <ul class="players">
      <li
        v-for="(player, index) in players"
        :key="index"
        class="player"
      >
        <nuxt-link
          :to="localePath({
            path: `/player/${player.name}-${player.id}`
          })"
          :style="{
            backgroundImage: `url(${player.imgSrc})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }"
        >
          <p class="player__meta">
            {{ player.name }} / {{ player.team }}
          </p>
        </nuxt-link>
      </li>
    </ul>

    <!-- Nuxt child for player modal -->
    <nuxt-child />
  </div>
</template>

<script>
import Base from './_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>

<i18n>
{
  "en": {
    "greeting": "Localization test - Hi there!"
  },

  "ko": {
    "greeting": "다국어 지원 테스트 - 안녕하세요!"
  }
}
</i18n>