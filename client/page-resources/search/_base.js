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
    }
  },


  // ROUTER HOOK의 존재 이유
  // search페이지에서는 player modal이 별도의 url을 갖지 않는다. (일반 팝업으로 작동)
  // 그렇기 때문에 모바일에서 뒤로가기를 누르면 팝업만 닫히는게 아니라 페이지가 이동되어 버리고
  // 이건 존나 성가시다.
  // 그렇기 때문에 팝업이 열려있을 때 route가 업데이트 되거나 (url query만 바뀌는 경우),
  // 이동하면 player modal만 닫고 페이지는 유지한다.
  // next(false)가 라우트를 막는 역할을 한다.
  // 단, 'Update'의 경우 사용자가 뒤로가기를 누르면 url query가 바뀌었다가, 다시 원래대로 돌아오는데
  // (/search?clubId=12 -> /search?clubId=15 -> /search?clubId=12)
  // 이는 정상적인 현상으로 보기에 살짝 옥의 티처럼 느껴지긴 하지만 더 나은 해결책이 있을때까지는
  // 그냥 두기로 한다.
  // 참고 : https://router.vuejs.org/kr/guide/advanced/navigation-guards.html 여기에서 next(false)를 볼것
  beforeRouteUpdate(to, from, next) {
    if (this.isPlayerModalOpen) {
      this.closePlayerModalHandler();
      next(false);
    } else {
      if (process.client) document.documentElement.style.overflow = 'auto';
      next();
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.isPlayerModalOpen) {
      this.closePlayerModalHandler();
      next(false);
    } else {
      if (process.client) document.documentElement.style.overflow = 'auto';
      next();
    }
  }
};