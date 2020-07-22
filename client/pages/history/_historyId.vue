<template>
  <div id="history-page">
    <div class="history">
      <div class="history__period">
        <div class="history__period-content">
          <nuxt-link :to="localePath('histories')">
            <v-icon>mdi-keyboard-backspace</v-icon>
            <span>Histories</span>
          </nuxt-link>

          <p>{{ $moment(startDate).format('YYYY. MM. DD HH:mm') }} ~ {{ $moment(endDate).format('YYYY. MM. DD HH:mm') }}</p>
        </div>
      </div>

      <nos-top-player
        :top-player="topPlayer"
        :is-historical="true"
        :history-id="$route.params.historyId"
        :need-player-comments-preview="true"
      />

      <nos-player-list
        :top-player-score="parseInt(topPlayer.score)"
        :player-list-prop="restOfPlayers"
        :is-historical="true"
        :history-id="$route.params.historyId"
        :need-player-comments-preview="true"
        :load-more-player-switch="isBottomOfWindow"
        :previous-player-id-list-prop="previousPlayerIdList"
        @morePlayerLoaded="isBottomOfWindow = false"
      />

      <!-- Nuxt child for player modal -->
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import Base from '@/page-resources/history/historyId/_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/history/historyId/_style.scss";
</style>