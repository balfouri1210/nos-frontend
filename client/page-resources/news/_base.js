import nosClubs from '@/components/nos-clubs/nos-clubs.vue';
import nosNewsItem from '@/components/nos-news-item/nos-news-item.vue';

export default {
  components: {
    nosClubs,
    nosNewsItem
  },

  data() {
    return {
      selectedClubList: []
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
    getNews(keyword) {
      return this.$axios.$get(
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
        });
    },

    async selectClubHandler(club) {
      try {
        club.newsList = (await this.getNews(club.clean_name)).value;
        this.selectedClubList.push(club);
        console.log(this.selectedClubList);
      } catch (err) {
        console.error(err);
      }
    }
  }
};