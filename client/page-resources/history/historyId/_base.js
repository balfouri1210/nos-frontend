import nosTopPlayer from '@/components/nos-top-player/nos-top-player.vue';
import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';

export default {
  layout: 'wide',

  components: {
    nosTopPlayer,
    nosPlayerList
  },

  async asyncData({ $axios, route, error }) {
    try {
      const [wholePlayerList, history] = await Promise.all([
        $axios.$get(`/api/histories/player/${route.params.historyId}`),
        $axios.$get(`/api/histories/${route.params.historyId}`)
      ]);

      const topPlayer = wholePlayerList[0];
      wholePlayerList.shift();
      const restOfPlayers = wholePlayerList;

      const startDate = history.start_date;
      const endDate = history.end_date;

      return { topPlayer, restOfPlayers, startDate, endDate };
    } catch (err) {
      console.error(err);
      return error({ statusCode: 500 });
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