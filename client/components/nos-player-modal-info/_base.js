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
          name: 'doubt',
          iconName: 'mdi-emoticon-confused-outline'
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
      isVoting: false
    };
  },

  created() {
    this.voteList.forEach(vote => {
      vote.count = this.player[`vote_${vote.name}_count`];
    });

    this.voteList.sort((a, b) => { 
      return a.count < b.count ? 1 : a.count > b.count ? -1 : 0;  
    });
  },

  methods: {
    ...mapGetters(['getJwt', 'getId']),

    checkIsLoggedIn() {
      if (!this.getJwt()) {
        this.$parent.isRequestLoginPopup = true;
      } else {
        return true;
      }
    },

    showAllVotes() {
      if (!this.checkIsLoggedIn()) return;
      this.allVotes = true;
    },

    async votePlayer(vote) {
      if (!this.checkIsLoggedIn()) return;
      if (this.$route.name.indexOf('history') !== -1) return;

      try {
        this.isVoting = true;

        if (this.player.vote) {
          if (this.player.vote === vote) {
            // 이미 한 투표와 같은 표 선택 : 투표 취소
            await this.$axios.$delete('/api/vote/player', {
              params: {
                playerId: this.player.id,
                vote
              }
            });

            this.player[`vote_${vote}_count`]--;
            this.player.vote = null;
          } else {
            // 이미 한 투표와 다른 표 선택
            await this.$axios.$put('/api/vote/player', {
              playerId: this.player.id,
              vote
            });

            this.player[`vote_${this.player.vote}_count`]--;
            this.player[`vote_${vote}_count`]++;
            this.player.vote = vote;
          }
        } else {
          // 일반 투표
          await this.$axios.$put('/api/vote/player', {
            playerId: this.player.id,
            vote
          });

          this.player[`vote_${vote}_count`]++;
          this.player.vote = vote;
        }
      } catch (err) {
        console.error(err);
        alert('Oh no! We were unable to process your request. Please try again or Contact us.');
        // return this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isVoting = false;
      }
    }
  }
};