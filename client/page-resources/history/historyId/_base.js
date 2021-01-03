import nosTopPlayer from '@/components/nos-top-player/nos-top-player.vue';
import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';
import nosCommentArea from '@/components/nos-comment-area/nos-comment-area.vue';
import nosHistoryPeriod from '@/components/nos-history-period/nos-history-period.vue';

export default {
  layout: 'wide',

  components: {
    nosTopPlayer,
    nosPlayerList,
    nosCommentArea,
    nosHistoryPeriod
  },

  async asyncData({ $axios, route, error }) {
    try {
      const [wholePlayerList, history] = await Promise.all([
        $axios.$get(`/api/histories/${route.params.historyId}/player`, {
          params: {
            count: 21
          }
        }),
        $axios.$get(`/api/histories/${route.params.historyId}`)
      ]);

      const topPlayer = wholePlayerList[0];
      const high4Players = wholePlayerList.slice(1, 5);
      const restOfPlayers = wholePlayerList.slice(5, wholePlayerList.length);

      return { topPlayer, high4Players, restOfPlayers, history };
    } catch (err) {
      error({ statusCode: 500 });
    }
  },

  computed: {
    previousPlayerIdList() {
      const result = this.high4Players.map(player => player.id).concat(this.topPlayer.id);
      return result;
    }
  },

  head() {
    return {
      title: `907Degrees - History: ${this.$moment(this.history.start_date).format(
        'YYYY. MM. DD HH:mm'
      )} ~ ${this.$moment(this.history.end_date).format('YYYY. MM. DD HH:mm')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `History of ${this.$moment(this.history.start_date).format(
            'YYYY. MM. DD HH:mm'
          )} ~ ${this.$moment(this.history.end_date).format('YYYY. MM. DD HH:mm')}`
        }
      ]
    };
  }
};