<template>
  <div>
    <div class="history">
      <div class="history__period">
        <p>Previous Leaderboard</p>
        <p>{{ $moment(startDate).format('YYYY. MM. DD HH:mm') }} ~ {{ $moment(endDate).format('YYYY. MM. DD HH:mm') }}</p>
      </div>

      <nos-player-list :initial-player-list="playerHistories" />

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
  &__period {
    margin-bottom: 4px;
    padding: 8px;
    background: linear-gradient(320deg, $nos-main-theme 30%, #ea5514 80%);
    text-align: center;
    font-size: 14px;
    color: white;
  }
}

@media screen and (min-width: $mobile-width) {
  .history {
    margin-bottom: 80px;
  }
}
</style>