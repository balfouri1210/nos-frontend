export default {
  props: {
    // 선수들의 온도를 계산할 때 필요 (기준값)
    topPlayerScore: {
      type: Number,
      default: 0
    },

    // 원하는 플레이어 리스트
    playerListProp: {
      type: Array,
      default: () => []
    },

    // 최근 3개의 커멘트를 미리 보여줄지 선택
    needPlayerCommentsPreview: {
      type: Boolean,
      default: false
    },

    // 메타정보를 보여줄지 선택
    needPlayerMeta: {
      type: Boolean,
      default: false
    },

    // 일반 요청과 history페이지 에서의 요청을 구분하기 위한 옵션
    isHistorical: {
      type: Boolean,
      default: false
    },

    // isHistorical 옵션과 함께 활용
    historyId: {
      type: String,
      default: null
    },

    // loadMorePlayer 요청시 사용하는 값
    previousPlayerIdListProp: {
      type: Array,
      default: () => []
    },

    // load more버튼으로 플레이어를 추가로딩하는 옵션
    activateLoadMore: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      playerList: this.playerListProp.slice(0),
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

      playerIdList = this.previousPlayerIdListProp.concat(playerIdList);
      return playerIdList;
    },

    degreeCalculator() {
      return score => {
        if (score <= 0) {
          return 0;
        } else if (parseInt(score) === this.topPlayerScore && this.$route.name.indexOf('search') === -1) {
          return 906;
        } else {
          return Math.round((907 * score) / Math.round(this.topPlayerScore));
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
    },

    // meta영역의 height를 comments preview갯수에 따라 동적으로 설정하기 위한 변수.
    // legacy player list 에서 쓰이는 변수지만 나중에 구현하려면 귀찮으니까 일단 남겨둔다.
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
    }
  },

  async created() {
    try {
      if (this.needPlayerCommentsPreview) {
        const playerCommentsPreview = await this.getPlayerCommentsPreview(this.playerList);
        this.playerCommentsPreviewMapping(this.playerList, playerCommentsPreview);
      }

      if (this.activateLoadMore) {
        if (this.$route.name.indexOf('history') === -1) {
          this.totalPlayerCount = (await this.$axios.$get('/api/players/total')).total_player_count;
        } else {
          this.totalPlayerCount = (await this.$axios.$get(`/api/histories/player/total/${this.historyId}`)).total_player_count;
        }
      }
    } catch (err) {
      console.error(err);
    }
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
          this.$router.push(this.localePath({
            name: 'search-searchData-player-playerId-playerName',
            params: {
              searchData: this.$route.params.searchData ? this.$route.params.searchData : null,
              playerId: player.id,
              playerName: player.known_as.toLowerCase().replace(/ /g, '-')
            }
          }));
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
      if (this.isMorePlayersLoading) {
        return;
      } else if (this.previousPlayerIdListProp.length > 0) {
        if (this.playerList.length + this.previousPlayerIdListProp.length >= this.totalPlayerCount) return;
      } else {
        if (this.playerList.length + 1 >= this.totalPlayerCount) return;
      }

      try {
        this.isMorePlayersLoading = true;
        let loadedPlayers;

        if (this.isHistorical) {
          // History에서의 Load more player
          loadedPlayers = await this.$axios.$get(`/api/histories/player/${this.historyId}`, {
            params: {
              previousPlayerIdList: this.previousPlayerIdList.toString()
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
        this.$emit('morePlayerLoaded');
        this.isMorePlayersLoading = false;
      }
    }
  }
};