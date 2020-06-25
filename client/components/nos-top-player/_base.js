export default {
  props: {
    topPlayer: {
      type: Object,
      default: () => {}
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
      nosImageUrl: process.env.NOS_IMAGE_URL
    };
  },

  methods: {
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