import nosClubs from '@/components/nos-clubs/nos-clubs.vue';
import nosNewsItem from '@/components/nos-news-item/nos-news-item.vue';

export default {
  components: {
    nosClubs,
    nosNewsItem
  },

  data() {
    return {
      searchTarget: 'league',
      selectedClub: {}
    };
  },

  async asyncData({ $axios }) {
    try {
      const newsList = await $axios.$get(
        process.env.BING_API_URL, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
          },

          params: {
            mkt: 'en-GB',
            category: 'Sports',
            count: 30,
            originalImg: true,
            sortBy: null,
            offset: 0,
            q: 'premier league'
          }
        });

      return {
        newsList: newsList.value
      };
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    async getNews(keyword) {
      try {
        this.newsList = (await this.$axios.$get(
          process.env.BING_API_URL, {
            headers: {
              'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
            },

            params: {
              mkt: 'en-GB',
              category: 'Sports',
              count: 30,
              originalImg: true,
              sortBy: null,
              offset: 0,
              q: keyword
            }
          })).value;
      } catch (err) {
        console.error(err);
      }
    },

    async selectSearchTarget(target) {
      if (target === 'league') {
        this.searchTarget = 'league';
        this.selectedClub = {};
        await this.getNews('premier league');
      } else {
        this.searchTarget = 'club';
        this.selectedClub = target;
        await this.getNews(target.clean_name);
      }
    }
  }
};