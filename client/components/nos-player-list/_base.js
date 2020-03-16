import U from '@/lib/util';
import { PLAYER_LIST_MAX } from '@/lib/constants';

export default {
  data() {
    return {
      topPlayer: this.initialPlayerList[0],
      topScore: this.initialPlayerList[0].score,
      playerList: this.initialPlayerList.slice(1),
      isMorePlayersLoading: false
    };
  },

  computed: {
    previousPlayerIdList() {
      let playerIdList = this.playerList.map(player => {
        return player.id;
      });
      playerIdList.unshift(this.topPlayer.id);
      return playerIdList;
    },

    degreeCalculator() {
      return score => {
        if (score <= 0) {
          return 0;
        } else if (score === this.topScore) {
          return 906;
        } else {
          return Math.round((907 * score) / this.topScore);
        }
      };
    }
  },

  mounted() {
    window.addEventListener('scroll', this.detectScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.detectScroll);
  },

  methods: {
    selectPlayer(player) {
      this.$store.commit('player/mutatePlayerId', player.id);
      this.$store.commit('player/mutatePlayerName', player.known_as);
      U.savePlayerInfoToCookie(player.id, player.known_as);

      if (this.$route.name.indexOf('history') !== -1) {
        this.$router.push(`/history/${this.$route.params.historyId}/player/${player.known_as}`);
      } else {
        this.$router.push(`/player/${player.known_as}`);
      }
    },

    async loadMorePlayers() {
      if (this.isMorePlayersLoading || this.playerList.length >= PLAYER_LIST_MAX - 1) return;

      let apiUrl = '/api/players';
      if (this.$route.name.indexOf('history') !== -1) apiUrl = `/api/histories/player/${this.$route.params.historyId}`;

      try {
        this.isMorePlayersLoading = true;

        const loadedPlayers = await this.$axios.$get(apiUrl, {
          params: {
            previousPlayerIdList: this.previousPlayerIdList
          }
        });

        this.playerList = this.playerList.concat(loadedPlayers);
        if (this.playerList.length > PLAYER_LIST_MAX) this.resizePlayerList();
      } catch (err) {
        console.error(err);
        return this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isMorePlayersLoading = false;
      }
    },

    resizePlayerList() {
      this.playerList = this.playerList.slice(1, PLAYER_LIST_MAX);
    },

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
        document.getElementById('player-list-wrapper').offsetHeight;

      if (bottomOfWindow) this.loadMorePlayers();
    }
  }
};