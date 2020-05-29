<template>
  <div class="home">
    <nos-onboarding-ui />
    <nos-preseason-ui v-if="$store.getters.getAppStatus === 'preseason'" />

    <div
      v-else
      :class="{'home--lastStage': $store.getters.getAppStatus === 'lastStage'}"
    >
      <client-only v-if="$store.getters.getAppStatus === 'lastStage'">
        <nos-countdown @seasonEnd="seasonEndHandler">
          <p>LEADERBOARD RESETS AFTER</p>
        </nos-countdown>
      </client-only>

      <nos-player-list :initial-player-list="initialPlayerList" />
    </div>

    <!-- Nuxt child for player modal -->
    <nuxt-child />
  </div>
</template>

<script>
import Base from '@/page-resources/index/_base';

export default {
  layout: 'wide',
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/index/_style.scss";
</style>