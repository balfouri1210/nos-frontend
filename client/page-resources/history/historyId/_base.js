import nosTopPlayer from '@/components/nos-top-player/nos-top-player.vue';
import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';
import nosCommentArea from '@/components/nos-comment-area/nos-comment-area.vue';

export default {
  layout: 'wide',

  components: {
    nosTopPlayer,
    nosPlayerList,
    nosCommentArea
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
  
      const startDate = history.start_date;
      const endDate = history.end_date;
  
      return { topPlayer, high4Players, restOfPlayers, startDate, endDate };
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
      title: `907Degrees - History: ${this.$moment(this.startDate).format(
        'YYYY. MM. DD HH:mm'
      )} ~ ${this.$moment(this.endDate).format('YYYY. MM. DD HH:mm')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `History of ${this.$moment(this.startDate).format(
            'YYYY. MM. DD HH:mm'
          )} ~ ${this.$moment(this.endDate).format('YYYY. MM. DD HH:mm')}`
        }
      ]
    };
  }
};