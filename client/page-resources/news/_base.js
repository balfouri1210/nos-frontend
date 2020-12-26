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
      searchKeyword: 'premier league',
      selectedClub: {},

      newsSortCriteria: null
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
    async getNews() {
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
              sortBy: this.newsSortCriteria,
              offset: 0,
              q: this.searchKeyword
            }
          })).value;
      } catch (err) {
        console.error(err);
      }
    },

    async selectSearchTarget(target) {
      if (target === 'league') {
        this.selectedClub = {};
        this.searchTarget = 'league';
        this.searchKeyword = 'premier league';
        await this.getNews();
      } else {
        this.selectedClub = target;
        this.searchTarget = 'club';
        this.searchKeyword = target.clean_name;
        await this.getNews();
      }
    },

    setNewsSortCriteria(criteria) {
      this.newsSortCriteria = criteria;
      this.getNews();
    }
  }
};