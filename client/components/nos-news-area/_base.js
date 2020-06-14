export default {
  props: {
    searchKeyword: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      isNewsLoading: true,
      isMoreNewsLoading: false,
      newsSortCriteria: null,
      newsList: [],
      moreNewsListContainer: null,
      newsPage: 0,
      isAllNewsLoaded: false
    };
  },

  created() {
    this.getNews();
  },

  methods: {
    async getNews() {
      try {
        this.isNewsLoading = true;

        const newsResponse = await this.$axios.$get(
          'https://nos-news.cognitiveservices.azure.com/bing/v7.0/news/search', {
            headers: {
              'Ocp-Apim-Subscription-Key': process.env.AZURE_API_KEY
            },
  
            params: {
              cc: 'GB',
              count: 30,
              originalImg: true,
              sortBy: this.newsSortCriteria,
              offset: this.newsPage * 30,
              q: this.searchKeyword.replace(/-/g, ' ')
            }
          }
        );

        this.newsList.push(...newsResponse.value);

        this.moreNewsListContainer = (await this.requestNextPageNews()).value;
      } catch (err) {
        console.error(err);
      } finally {
        this.isNewsLoading = false;
      }
    },

    async getMoreNews() {
      try {
        this.isMoreNewsLoading = true;

        const moreNewsResponse = (await this.requestNextPageNews()).value;

        this.newsList = this.newsList.concat(this.moreNewsListContainer);
        this.moreNewsListContainer = moreNewsResponse;

        this.newsList.forEach(news => {
          if (news.url === this.moreNewsListContainer[0].url) {
            this.isAllNewsLoaded = true;
          }
        });
      } catch (err) {
        console.error(err);
      } finally {
        this.isMoreNewsLoading = false;
      }
    },

    loadMoreNews() {
      this.newsPage ++;
      this.getMoreNews();
    },

    requestNextPageNews() {
      return this.$axios.$get(
        'https://nos-news.cognitiveservices.azure.com/bing/v7.0/news/search', {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.AZURE_API_KEY
          },

          params: {
            cc: 'GB',
            count: 20,
            originalImg: true,
            sortBy: this.newsSortCriteria,
            offset: (this.newsPage + 1) * 20,
            q: this.searchKeyword.replace(/-/g, ' ')
          }
        }
      );
    },

    setNewsSortCriteria(criteria) {
      this.newsList = [];
      this.newsPage = 0;
      this.newsSortCriteria = criteria;
      this.getNews();
    }
  }
};