import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';
import { eplClubs } from '@/lib/constants';
import nosFixturesArea from '@/components/nos-fixtures-area/nos-fixtures-area.vue';
import nosPlayerModal from '@/components/nos-player-modal/nos-player-modal.vue';

export default {
  head() {
    return {
      title: 'Search player',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Search player and leave your opinion'
        }
      ]
    };
  },

  components: {
    nosPlayerList,
    nosFixturesArea,
    nosPlayerModal
  },

  // watchQuery, key는 route이동때문에 추가된 항목이다.
  // search를 계속할 경우, 같은 route에서 query만 바뀌게 되는데,
  // 이 두 녀석이 있어야 바뀐 query를 감지하고, 페이지 이동없이 데이터만 업데이트 할 수 있다.
  // 참고 : https://github.com/nuxt/nuxt.js/issues/2591
  watchQuery: true,
  key: to => to.fullPath,

  async asyncData({ $axios, error, route }) {
    function getTopPlayer() {
      return $axios.$get('/api/players/top-player');
    }

    function getPlayerList() {
      return $axios.$get('/api/search', {
        params: {
          keyword: route.query.keyword,
          clubId: route.query.clubId
        }
      });
    }

    try {
      const [topPlayer, searchPlayerList] = await Promise.all([
        getTopPlayer(), getPlayerList()
      ]);

      return { topPlayer, searchPlayerList };
    } catch (err) {
      console.error(err);
      return error({ statusCode: 500 });
    }
  },

  data() {
    return {
      targetClub: {},

      isPlayerModalOpen: false,
      targetPlayer: {},
      targetPlayerComments: []
    };
  },

  created() {
    if (this.$route.query.clubId) {
      this.targetClub = eplClubs.filter(club => {
        return club.id === parseInt(this.$route.query.clubId);
      })[0];
    }
  },

  methods: {
    async selectPlayerHandler(selectedPlayer) {
      try {
        if (process.client) document.documentElement.style.overflow = 'hidden';

        const [player, comments] = await Promise.all([
          this.getPlayer(selectedPlayer),
          this.getComments(selectedPlayer)
        ]);

        this.targetPlayer = player;
        this.targetPlayerComments = comments;
        this.isPlayerModalOpen = true;
      } catch (err) {
        console.error(err);
        this.$nuxt.error({ statusCode: 500 });
      }
    },

    getPlayer(selectedPlayer) {
      return this.$axios.$get(`/api/players/${selectedPlayer.id}`);
    },

    getComments(selectedPlayer) {
      return this.$axios.$get(`/api/comments/player/${selectedPlayer.id}`, {
        params: {
          sortType: 'like'
        }
      });
    },

    closePlayerModalHandler() {
      if (process.client) document.documentElement.style.overflow = 'auto';
      this.isPlayerModalOpen = false;
    },

    // Body scroll release
    beforeRouteLeave(to, from ,next) {
      if (process.client) document.documentElement.style.overflow = 'auto';
      next();
    }
  }
};