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
      newsSortCriteria: null,
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
              q: this.newsKeyword.replace(/-/g, ' ')
            }
          });

        this.newsList = newsList.value;

        // 일단 load more news를 비활성화 하기로했다 (이유는 아래 코멘트 참고)
        // this.moreNewsListContainer = moreNewsListContainer.value;

        // 첫 기사가 20개 미만일 경우 load more news 끄기
        // if (this.newsList.length < 20) this.isAllNewsLoaded = true;
      } catch (err) {
        console.error(err);
        this.isNewLoadFailed = true;
      } finally {
        this.isNewsLoading = false;
      }
    },

    setNewsSortCriteria(criteria) {
      this.newsList = [];
      this.newsPage = 0;
      this.newsSortCriteria = criteria;
      this.getNews();
    },


    // 일단 load more news를 비활성화 하기로했다
    // 이유
    // 1. 돈 아끼려고 (내가 계획한대로 하면 선수 클릭할때마다 1, 2페이지를 받아오기 때문에 요청이 2배라고 할 수 있다)
    // 2. 굳이 필요없을 것 같아서 (관련성, 시간순서 정렬기준이 제공되고, 선수에 대한 뉴스가 기본 20개보다 더 필요하지 않아보인다)
    // async getMoreNews() {
    //   try {
    //     this.isMoreNewsLoading = true;

    //     const moreNewsResponse = (await this.requestNextPageNews()).value;

    //     this.newsList = this.newsList.concat(this.moreNewsListContainer);
    //     this.moreNewsListContainer = moreNewsResponse;

    //     this.newsList.forEach(news => {
    //       if (news.url === this.moreNewsListContainer[0].url) {
    //         this.isAllNewsLoaded = true;
    //       }
    //     });
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     this.isMoreNewsLoading = false;
    //   }
    // },

    // loadMoreNews() {
    //   this.newsPage ++;
    //   this.getMoreNews();
    // },

    // requestNextPageNews() {
    //   return this.$axios.$get(
    //     'https://nos-news.cognitiveservices.azure.com/bing/v7.0/news/search', {
    //       headers: {
    //         'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
    //       },

    //       params: {
    //         cc: 'GB',
    //         count: this.newsCountPerRequest,
    //         originalImg: true,
    //         sortBy: this.newsSortCriteria,
    //         offset: (this.newsPage + 1) * 20,
    //         q: this.newsKeyword.replace(/-/g, ' ')
    //       }
    //     }
    //   );
    // }
  }
};