<template>
  <div>
    <h1>This is 907Degrees. by Balfouri</h1>
    <h1>CURRENT STAGE IS <span style="color: orange">'{{ stage }}'</span></h1>

    <nuxt-link
      :to="localePath('signup')"
    >
      GO TO SIGNUP PAGE
    </nuxt-link>

    <div
      v-if="getJwt()"
      style="color: hotpink"
    >
      Hello, {{ getEmail() }}
    </div>

    <div>
      {{ $t('greeting') }}
    </div>

    <ul>
      <li
        v-for="(player, index) in players"
        :key="index"
      >
        <nuxt-link
          :to="localePath({
            path: `/player/${player.name}`
          })"
        >
          {{ player.name }} / {{ player.team }}
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