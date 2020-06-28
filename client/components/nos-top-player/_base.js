export default {
  props: {
    topPlayer: {
      type: Object,
      default: () => {}
    },

    needPlayerCommentsPreview: {
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
      nosImageUrl: process.env.NOS_IMAGE_URL,
      topPlayerCommentsPreview: []
    };
  },

  async created() {
    try {
      if (this.needPlayerCommentsPreview)
        this.topPlayerCommentsPreview = await this.getPlayerCommentsPreview(this.topPlayer);
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    getPlayerCommentsPreview(player) {
      return this.$axios.$get('/api/comments/preview/player', {
        params: {
          playerIdList: player.id
        }
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
    }
  }
};