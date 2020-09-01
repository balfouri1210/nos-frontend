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
            quantityPerRequest: 5
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
};