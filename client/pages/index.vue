<template>
  <div class="home">
    <nos-preseason-ui v-if="$store.getters.getAppStatus === 'preseason'" />

    <div
      v-else
      class="home__body"
    >
      <client-only>
        <nos-countdown @seasonEnd="seasonEndHandler">
          <p>NEW LEADERBOARD - </p>
        </nos-countdown>
      </client-only>

      <nos-top-player
        :top-player="topPlayer"
        :need-player-comments-preview="true"
      />

      <nos-main-event />

      <nos-player-list
        :top-player="topPlayer"
        :initial-player-list="restOfPlayers"
        :need-player-comments-preview="true"
      />
    </div>

    <nos-onboarding-ui />

    <!-- Nuxt child for player modal -->
    <nuxt-child />
  </div>
</template>

<script>
import Base from '@/page-resources/index/_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/index/_style.scss";
</style>