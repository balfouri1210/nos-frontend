import nosPositionBadge from '../nos-position-badge/nos-position-badge.vue';

export default {
  components: {
    nosPositionBadge
  },

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
      topPlayerCommentsPreview: [],
      innerWidth: process.client ? window.innerWidth : 0
    };
  },

  computed: {
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
      if (this.needPlayerCommentsPreview)
        this.topPlayerCommentsPreview = await this.getPlayerCommentsPreview(this.topPlayer);
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    getPlayerCommentsPreview(player) {
      if (this.isHistorical) {
        return this.$axios.$get(`/api/histories/${this.historyId}/player/comments/preview`, {
          params: {
            playerIdList: player.id,
            count: 6
          }
        });
      } else {
        return this.$axios.$get('/api/comments/preview/player', {
          params: {
            playerIdList: player.id,
            count: 6
          }
        });
      }
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