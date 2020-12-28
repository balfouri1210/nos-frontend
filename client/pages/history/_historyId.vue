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

      <div class="history__body">
        <nos-top-player
          :top-player="topPlayer"
          :is-historical="true"
          :history-id="$route.params.historyId"
          :need-player-comments-preview="true"
        />

        <nos-player-list
          :top-player-score="parseInt(topPlayer.score)"
          :player-list-prop="high4Players"
          :is-historical="true"
          :history-id="$route.params.historyId"
          :need-player-comments-preview="true"
          :start-rank="2"
        />

        <!-- COMMENT AREA -->
        <nos-comment-area :history-id="$route.params.historyId" />

        <nos-player-list
          :top-player-score="parseInt(topPlayer.score)"
          :player-list-prop="restOfPlayers"
          :is-historical="true"
          :history-id="$route.params.historyId"
          :need-player-comments-preview="true"
          :activate-load-more="true"
          :previous-player-id-list-prop="previousPlayerIdList"
          :start-rank="6"
        />

        <!-- NUXT CHILD for PLAYER MODAL -->
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import Base from '@/page-resources/history/historyId/_base';
console.log(Base);

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/history/historyId/_style.scss";
</style>