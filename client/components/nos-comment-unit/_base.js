import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  props: {
    initialSortType: {
      type: String,
      default: 'date'
    },

    sortTypeSelector: {
      type: Boolean,
      default: false
    },

    moreLink: {
      type: Boolean,
      default: false
    },

    quantityPerRequest: {
      type: Number,
      default: 5
    }
  },

  data() {
    return {
      sortType: null,
      comments: []
    };
  },

  created() {
    this.sortType = this.initialSortType;
    this.getComments(this.initialSortType);
  },

  methods: {
    ...mapGetters(['getJwt']),

    changeSortType(selectedSortType) {
      if (this.sortType !== selectedSortType) {
        this.sortType = selectedSortType;
        this.getComments(selectedSortType);
      }
    },

    async getComments(sortType) {
      try {
        this.comments = await this.$axios.$get('/api/comments/player', {
          params: {
            sortType,
            quantityPerRequest: this.quantityPerRequest
          }
        });
      } catch (err) {
        this.$nuxt.error({ statusCode: 500 });
      }
    },

    async votePlayerComment(vote) {
      try {
        if (!this.getJwt()) return;

        try {
          console.log('vote player comment: ' + vote);
          // this.isOpinionVoting = true;
          // const previousVote = opinion.vote;
  
          // if (opinion.vote) {
          //   if (opinion.vote === vote) {
          //     // 이미 한 투표와 같은 표 선택 : 투표 취소
          //     opinion[`vote_${opinion.vote}_count`] --;
          //     opinion.vote = null;
  
          //     await this.requestCancelVotePlayerOpinion(opinion, previousVote);
          //   } else {
          //     // 이미 한 투표와 다른 표 선택
          //     opinion[`vote_${opinion.vote}_count`] --;
          //     opinion[`vote_${vote}_count`] ++;
          //     opinion.vote = vote;
  
          //     await this.updateVotePlayerOpinion(opinion, previousVote, vote);
          //   }
          // } else {
          //   // 일반 투표
          //   opinion[`vote_${vote}_count`] ++;
          //   opinion.vote = vote;
          //   await this.requestVotePlayerOpinion(opinion, vote);
          // }
        } catch (err) {
          return this.$nuxt.error({ statusCode: 500 });
        } finally {
          // this.isOpinionVoting = false;
        }
      } catch (err) {
        this.$nuxt.error({ statusCode: 500 });
      }
    }
  }
};