<template>
  <div>
    <div class="history">
      <div class="history__period">
        <p>Previous Leaderboard</p>
        <p>{{ $moment(startDate).format('YYYY. MM. DD HH:mm') }} ~ {{ $moment(endDate).format('YYYY. MM. DD HH:mm') }}</p>
      </div>

      <nos-player-list
        :initial-player-list="playerHistories"
        :is-historical="true"
      />

      <!-- Nuxt child for player modal -->
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';

export default {
  layout: 'wide',

  components: {
    nosPlayerList
  },

  async asyncData({ $axios, route, error }) {
    try {
      const [playerHistories, history] = await Promise.all([
        $axios.$get(`/api/histories/player/${route.params.historyId}`),
        $axios.$get(`/api/histories/${route.params.historyId}`)
      ]);

      const startDate = history.start_date;
      const endDate = history.end_date;

      return { playerHistories, startDate, endDate };
    } catch (err) {
      console.error(err);
      return error({ statusCode: 500 });
    }
  }
};
</script>

<style lang="scss" scoped>
.history {
  padding-top: 60px;

  &__period {
    position: fixed;
    top: $mobile-header-height;
    left: 0;
    width: 100%;
    height: 58px;
    margin-bottom: 2px;
    padding: 8px;
    background: linear-gradient(320deg, $nos-main-theme 30%, #ea5514 80%);
    text-align: center;
    font-size: 14px;
    color: white;
    z-index: 50;
  }
}

@media screen and (min-width: $mobile-width) {
  .history {
    margin-bottom: 80px;

    &__period {
      top: $web-header-height;
    }
  }
}
</style>