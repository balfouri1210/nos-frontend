export default {
  props: {
    topPlayer: {
      type: Object,
      default: () => {}
    },

    // 요놈이 존재하는 이유 : page에서 asyncData로 최초 데이터를 받아온 상태에서 렌더링하기 위함.
    initialPlayerList: {
      type: Array,
      default: () => []
    },

    needPlayerCommentsPreview: {
      type: Boolean,
      default: false
    },

    needPlayerMeta: {
      type: Boolean,
      default: false
    },

    isHistorical: {
      type: Boolean,
      default: false
    },

    historyId: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      playerList: this.initialPlayerList.slice(0),
      isMorePlayersLoading: false,
      nosImageUrl: process.env.NOS_IMAGE_URL,
      totalPlayerCount: 0,
      innerWidth: process.client ? window.innerWidth : 0
    };
  },

  computed: {
    previousPlayerIdList() {
      let playerIdList = this.playerList.map(player => {
        return player.id;
      });
      playerIdList.unshift(this.topPlayer.id);
      return playerIdList.toString();
    },

    degreeCalculator() {
      return score => {
        if (score <= 0) {
          return 0;
        } else if (score === this.topPlayer.score && this.$route.name.indexOf('search') === -1) {
          return 906;
        } else {
          return Math.round((907 * score) / Math.round(this.topPlayer.score));
        }
      };
    },

    // meta영역의 height를 comments preview갯수에 따라 동적으로 설정하기 위한 변수.
    playerMetaHeight() {
      return (player) => {
        if (player.commentsPreview) {
          if (this.innerWidth < 865) {
            return `${3 + (player.commentsPreview.length * 1.5)}rem`;
          } else {
            return `${6 + (player.commentsPreview.length * 2)}rem`;
          }
        }
      };
    },

    withIn12Hours() {
      return player => {
        if (player.last_commented_at) {
          const criterionTime = this.$moment.utc().subtract(12, 'h');
          return this.$moment.utc(player.last_commented_at).isAfter(criterionTime);
        }
      };
    }
  },

  async created() {
    try {
      if (this.needPlayerCommentsPreview) {
        const playerCommentsPreview = await this.getPlayerCommentsPreview(this.playerList);
        this.playerCommentsPreviewMapping(this.playerList, playerCommentsPreview);
      }

      // 총 선수 수를 할당 (선수가 모두 로딩되었을 때, 자동 로딩을 멈추기 위한 장치)
      if (this.$route.name.indexOf('history') === -1) {
        this.totalPlayerCount = (await this.$axios.$get('/api/players/total')).total_player_count;
      } else {
        this.totalPlayerCount = (await this.$axios.$get(`/api/histories/player/total/${this.historyId}`)).total_player_count;
      }
    } catch (err) {
      console.error(err);
    }
  },

  mounted() {
    if (this.$route.name.indexOf('search') === -1)
      window.addEventListener('scroll', this.detectScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.detectScroll);
  },

  methods: {
    getPlayerCommentsPreview(playerList) {
      const playerIdList = playerList.map(player => player.id);

      if (this.isHistorical) {
        return this.$axios.$get(`/api/histories/${this.historyId}/player/comments/preview`, {
          params: {
            playerIdList: playerIdList.toString()
          }
        });
      } else {
        return this.$axios.$get('/api/comments/preview/player', {
          params: {
            playerIdList: playerIdList.toString()
          }
        });
      }
    },

    playerCommentsPreviewMapping(playerList, playerCommentsPreview) {
      playerList.forEach(player => {
        this.$set(player, 'commentsPreview', playerCommentsPreview.filter(comment => comment.player_id === player.id));
      });
    },

    async selectPlayer(player) {
      try {
        if (this.isHistorical) {
          // History 페이지에서 선수를 클릭했을 때
          this.$router.push(this.localePath({
            name: 'history-historyId-player-playerId-playerName',
            params: {
              historyId: this.historyId,
              playerId: player.id,
              playerName: player.known_as.toLowerCase().replace(/ /g, '-')
            }
          }));
        } else if (this.$route.name.indexOf('search') !== -1) {
          // Search 페이지에서 선수를 클릭했을 때
          this.$emit('selectPlayer', player);
        } else {
          // Main 페이지에서 선수를 클릭했을 때
          this.$router.push(this.localePath({
            name: 'index-player-playerId-playerName',
            params: {
              playerId: player.id,
              playerName: player.known_as.toLowerCase().replace(/ /g, '-')
            }
          }));
        }
      } catch (err) {
        console.error(err);
        return this.$nuxt.error({ statusCode: 500 });
      }
    },

    async loadMorePlayers() {
      if (this.isMorePlayersLoading || this.playerList.length + 1 >= this.totalPlayerCount) return;

      try {
        this.isMorePlayersLoading = true;
        let loadedPlayers;

        if (this.isHistorical) {
          // History에서의 Load more player
          loadedPlayers = await this.$axios.$get(`/api/histories/player/${this.historyId}`, {
            params: {
              previousPlayerIdList: this.previousPlayerIdList
            }
          });

          if (this.needPlayerCommentsPreview) {
            const loadedPlayerCommentsPreview = await this.getPlayerCommentsPreview(loadedPlayers);
            this.playerCommentsPreviewMapping(loadedPlayers, loadedPlayerCommentsPreview);
          }
        } else {
          // 메인페이지에서의 Load more player
          loadedPlayers = await this.$axios.$get('/api/players', {
            params: {
              previousPlayerIdList: this.previousPlayerIdList
            }
          });

          if (this.needPlayerCommentsPreview) {
            const loadedPlayerCommentsPreview = await this.getPlayerCommentsPreview(loadedPlayers);
            this.playerCommentsPreviewMapping(loadedPlayers, loadedPlayerCommentsPreview);
          }
        }

        this.playerList = this.playerList.concat(loadedPlayers);
      } catch (err) {
        console.error(err);
        return this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isMorePlayersLoading = false;
      }
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