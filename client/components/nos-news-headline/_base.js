export default {
  props: {
    newsKeyword: {
      type: String,
      default: 'premier league'
    },

    newsCountPerRequest: {
      type: Number,
      default: 20
    },

    isHeader: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      newsList: null,
      newsSortCriteria: null,

      isNewsLoading: true,
      isNewLoadFailed: false
    };
  },

  created() {
    this.getNews(this.newsKeyword);
  },

  methods: {
    async getNews(newsKeyword) {
      try {
        this.isNewsLoading = true;

        const newsList = await this.$axios.$get(
          process.env.BING_API_URL, {
            headers: {
              'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
            },

            params: {
              mkt: 'en-GB',
              category: 'Sports',
              count: this.newsCountPerRequest,
              originalImg: true,
              sortBy: this.newsSortCriteria,
              offset: 0,
              q: newsKeyword.replace(/-/g, ' ')
            }
          });

        this.newsList = newsList.value;
      } catch (err) {
        console.error(err);
        this.isNewLoadFailed = true;
      } finally {
        this.isNewsLoading = false;
        console.log(this.newsList);
      }
    },

    setNewsSortCriteria(criteria) {
      this.newsList = [];
      this.newsSortCriteria = criteria;
      this.getNews();
    }
  }
};