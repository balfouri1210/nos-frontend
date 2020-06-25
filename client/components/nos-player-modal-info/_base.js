import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  props: {
    player: {
      type: Object,
      default() {
        return {};
      }
    },

    disabled: {
      type: Boolean,
      default: false
    },

    isHistorical: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      nosImageUrl: process.env.NOS_IMAGE_URL,

      voteList: [
        {
          name: 'up',
          iconName: 'mdi-thumb-up'
        }, {
          name: 'down',
          iconName: 'mdi-thumb-down'
        }, {
          name: 'question',
          iconName: 'mdi-help'
        }, {
          name: 'fire',
          iconName: 'mdi-fire'
        }, {
          name: 'celebration',
          iconName: 'mdi-party-popper'
        }, {
          name: 'strong',
          iconName: 'mdi-arm-flex'
        }, {
          name: 'alien',
          iconName: 'mdi-alien'
        }, {
          name: 'battery_high',
          iconName: 'mdi-battery-high'
        }, {
          name: 'battery_medium',
          iconName: 'mdi-battery-medium'
        }, {
          name: 'battery_low',
          iconName: 'mdi-battery-low'
        }, {
          name: 'battery_off',
          iconName: 'mdi-battery-off-outline'
        }, {
          name: 'bomb',
          iconName: 'mdi-bomb'
        }, {
          name: 'angry',
          iconName: 'mdi-emoticon-angry-outline'
        }, {
          name: 'hmm',
          iconName: '$vuetify.icons.hmm'
        }, {
          name: 'cool',
          iconName: 'mdi-emoticon-cool-outline'
        }, {
          name: 'sad',
          iconName: 'mdi-emoticon-cry-outline'
        }, {
          name: 'lol',
          iconName: 'mdi-emoticon-lol-outline'
        }, {
          name: 'poop',
          iconName: 'mdi-emoticon-poop'
        }
      ],

      allVotes: false,
      isVoting: false,

      playerTemperature: 0
    };
  },

  computed: {
    playerVotes() {
      let result = this.voteList.map(vote => {
        vote.count = this.player[`vote_${vote.name}_count`];
        return vote;
      });
      result.sort((a, b) => { 
        return a.count < b.count ? 1 : a.count > b.count ? -1 : 0;  
      });
    
      return result;
    }
  },

  async created() {
    try {
      this.topPlayerScore = (await this.$axios.$get('/api/players/top-player')).score;

      if (this.isHistorical) {
        this.playerTemperature = Math.round((907 * this.player.score) / this.player.top_player_score);
      } else {
        this.playerTemperature = Math.round((907 * this.player.score) / this.topPlayerScore);
      }
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    ...mapGetters(['getJwt', 'getId']),

    checkIsLoggedIn() {
      if (!this.getJwt()) {
        this.$parent.isRequestLoginPopup = true;
        return false;
      } else {
        return true;
      }
    },

    showAllVotes() {
      if (this.$route.name.indexOf('history') === -1) {
        if (!this.checkIsLoggedIn()) return;
      }

      this.allVotes = true;
    },

    async addPlayerVote(vote) {
      if (this.$route.name.indexOf('history') !== -1) return;
      if (!this.checkIsLoggedIn()) return; 

      try {
        this.isVoting = true;
        const previousPlayerVote = this.player.vote;

        if (this.player.vote) {
          if (this.player.vote === vote) {
            // 이미 한 투표와 같은 표 선택 : 투표 취소
            this.player[`vote_${vote}_count`]--;
            this.player.vote = null;

            await this.requestCancelPlayerVote(previousPlayerVote);
          } else {
            // 이미 한 투표와 다른 표 선택
            this.player[`vote_${this.player.vote}_count`]--;
            this.player[`vote_${vote}_count`]++;
            this.player.vote = vote;

            await this.requestUpdatePlayerVote(previousPlayerVote, vote);
          }
        } else {
          // 일반 투표
          this.player[`vote_${vote}_count`]++;
          this.player.vote = vote;

          await this.requestAddPlayerVote(vote);
        }
      } catch (err) {
        alert('Oh no! We were unable to process your request. Please try again or Contact us.');
        // return this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isVoting = false;
      }
    },

    requestAddPlayerVote(vote) {
      return this.$axios.$post('/api/vote/player', {
        playerId: this.player.id,
        vote
      });
    },

    requestUpdatePlayerVote(previousVote, vote) {
      return this.$axios.$put('/api/vote/player', {
        playerId: this.player.id,
        previousVote,
        vote
      });
    },

    requestCancelPlayerVote(vote) {
      return this.$axios.$delete('/api/vote/player', {
        params: {
          playerId: this.player.id,
          vote
        }
      });
    },

    watchOnYoutube() {
      const fallback = `https://youtube.com/results?search_query=${this.$route.params.playerName.replace(/-/g, ' ')}`;
      window.open(fallback, '_blank');

      function killPopup() {
        window.removeEventListener('pagehide', killPopup);
      }

      window.addEventListener('pagehide', killPopup);
    }
  }
};