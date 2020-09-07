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

        console.log(this.comments);
      } catch (err) {
        this.$nuxt.error({ statusCode: 500 });
      }
    }
  }
};