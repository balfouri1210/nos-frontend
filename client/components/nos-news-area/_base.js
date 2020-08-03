export default {
  props: {
    newsKeyword: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      isNewsLoading: true,
      isMoreNewsLoading: false,
      newsSortCriteria: 'date',
      newsList: [],
      moreNewsListContainer: null,
      newsPage: 0,
      isAllNewsLoaded: false,
      newsCountPerRequest: 20,
      isNewLoadFailed: false
    };
  },

  created() {
    this.getNews();
  },

  methods: {
    async getNews() {
      try {
        this.isNewsLoading = true;

        const [newsList, moreNewsListContainer] = await Promise.all([
          this.$axios.$get(
            'https://nos-news.cognitiveservices.azure.com/bing/v7.0/news/search', {
              headers: {
                'Ocp-Apim-Subscription-Key': process.env.AZURE_API_KEY
              },
    
              params: {
                cc: 'GB',
                count: this.newsCountPerRequest,
                originalImg: true,
                sortBy: this.newsSortCriteria,
                offset: 0,
                q: this.newsKeyword.replace(/-/g, ' ')
              }
            }
          ),

          this.requestNextPageNews()
        ]);

        this.newsList = newsList.value;
        this.moreNewsListContainer = moreNewsListContainer.value;

        // 첫 기사가 20개 미만일 경우 load more news 끄기
        if (this.newsList.length < 20) this.isAllNewsLoaded = true;
      } catch (err) {
        console.error(err);
        this.isNewLoadFailed = true;
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
            count: this.newsCountPerRequest,
            originalImg: true,
            sortBy: this.newsSortCriteria,
            offset: (this.newsPage + 1) * 20,
            q: this.newsKeyword.replace(/-/g, ' ')
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