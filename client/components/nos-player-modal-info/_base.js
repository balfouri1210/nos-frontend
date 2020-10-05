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
    },

    history: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      nosImageUrl: process.env.NOS_IMAGE_URL,

      hitsList: [],
      now: this.$moment.utc(),

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
    hitIndex() {
      return this.hitsList.findIndex((item) => {
        return item.id === this.player.id;
      });
    },

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
    this.calculatePlayerTemperature();
    if (process.client && this.$route.name.indexOf('history') === -1)
      this.manipulateHits();
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

    async manipulateHits() {
      if (window.localStorage.getItem('nos-hitsList')) {
        this.hitsList = window.localStorage.getItem('nos-hitsList').split('_').map(item => {
          return JSON.parse(item);
        });
      }

      this.filteredExpiredHit();

      try {
        if (this.hitIndex === -1) {
          this.hitsList.push({
            id: this.player.id,
            expires: this.$moment.utc().add(3, 'hours')
          });
          await this.increasePlayerHits();
        }

        this.hitsList = this.hitsList.map(item => {
          return JSON.stringify(item);
        });
        window.localStorage.setItem('nos-hitsList', this.hitsList.join('_'));
      } catch (err) {
        console.error(err);
        return this.$nuxt.error({ statusCode: 500 });
      }
    },

    filteredExpiredHit() {
      this.hitsList.forEach((item, index, obj) => {
        if (this.$moment.utc(item.expires).isBefore(this.now)) {
          obj.splice(index, 1);
        }
      });
    },

    increasePlayerHits() {
      return this.$axios.$put(`/api/players/hits/${this.player.id}`);
    },

    async calculatePlayerTemperature() {
      try {
        if (this.isHistorical) {
          // 히스토리모드일 때는 최고점이 박혀있으므로 요청필요 X
          this.playerTemperature
            = Math.round((907 * this.player.score) / this.player.top_player_score);
        } else {
          // 평상시에는 최고점을 그때그때 받아와야하므로 서버에 요청
          const topPlayer = await this.$axios.$get('/api/players/top-player');
          if (this.player.id === topPlayer.id) {
            this.playerTemperature = 907;
          } else {
            this.playerTemperature
              = Math.round((907 * this.player.score) / topPlayer.score);
          }
        }
      } catch (err) {
        console.error(err);
      }
    },


    showAllVotes() {
      if (!this.isHistorical) {
        if (!this.checkIsLoggedIn()) return;
      }

      this.allVotes = true;
    },

    async addPlayerVote(vote) {
      if (this.isHistorical) return;
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

    goToSearchWithClub(clubId) {
      this.$router.push(this.localePath({
        name: 'search-searchData',
        params: {
          searchData: `clubId_${clubId}`
        }
      }));
    },

    goToSearchWithCountry(countryCode, countryId) {
      this.$router.push(this.localePath({
        name: 'search-searchData',
        params: {
          searchData: `country_${countryCode}-${countryId}`
        }
      }));
    },

    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '0, 0, 0';
    },

    watchOnYoutube(playerName) {
      const fallback = `https://youtube.com/results?search_query=${playerName}`;
      window.open(fallback, '_blank');

      function killPopup() {
        window.removeEventListener('pagehide', killPopup);
      }

      window.addEventListener('pagehide', killPopup);
    },




    // Functions for Fake
    async requestAddPlayerFakeVote(vote) {
      await this.$axios.$post('/api/vote/player/fake', {
        playerId: this.player.id,
        vote
      });

      this.player[`vote_${vote}_count`] ++;
    },

    async requestPlayerFakeHits(player) {
      await this.increasePlayerHits();
      // this.$set(player, 'hits', player.hits + 1);
      player.hits ++;
    }
  }
};