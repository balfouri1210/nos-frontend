import nosTopPlayer from '@/components/nos-top-player/nos-top-player.vue';
import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';

export default {
  layout: 'wide',

  components: {
    nosTopPlayer,
    nosPlayerList
  },

  async asyncData({ $axios, route, error }) {
    const [wholePlayerList, history] = await Promise.all([
      $axios.$get(`/api/histories/${route.params.historyId}/player`, {
        params: {
          count: 21
        }
      }),
      $axios.$get(`/api/histories/${route.params.historyId}`)
    ]);

    const topPlayer = wholePlayerList[0];
    wholePlayerList.shift();
    const restOfPlayers = wholePlayerList;

    const startDate = history.start_date;
    const endDate = history.end_date;

    return { topPlayer, restOfPlayers, startDate, endDate };
  },

  computed: {
    previousPlayerIdList() {
      return [this.topPlayer.id];
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