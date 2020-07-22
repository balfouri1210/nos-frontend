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

  mounted() {
    window.addEventListener('scroll', this.detectScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.detectScroll);
  },

  data() {
    return {
      isBottomOfWindow: false
    };
  },

  computed: {
    previousPlayerIdList() {
      return [this.topPlayer.id];
    }
  },

  methods: {
    detectScroll() {
      let bottomOfWindow =
          // 스크롤 위치 중 최대값
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
          // 화면 높이
          window.innerHeight >=

          // player-list-wrapper 높이
          document.getElementById('history-page').offsetHeight;

      if (bottomOfWindow)
        this.isBottomOfWindow = true;
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