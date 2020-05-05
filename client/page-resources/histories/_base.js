import months from '@/lib/months';
import Cookies from 'js-cookie';

export default {
  transition: 'fade',

  async asyncData({ $axios, error, $moment, store }) {
    try {
      const histories = await $axios.$get('/api/histories', {
        params: {
          year: store.getters.getHistoryYear || $moment().format('YYYY'),
          month: store.getters.getHistoryMonth || $moment().format('MM')
        }
      });
      return { histories };
    } catch (err) {
      console.error(err);
      return error({ statusCode: 500 });
    }
  },

  data() {
    return {
      isMoreHistoriesLoading: false,
      months,
      selectedYear: this.$store.getters.getHistoryYear || this.$moment().format('YYYY'),
      selectedMonth: this.$store.getters.getHistoryMonth || this.$moment().format('M'),
      isHistoryLoading: false
    };
  },

  computed: {
    isMonthSelected() {
      return month => {
        return month.num === parseInt(this.selectedMonth);
      };
    }
  },

  methods: {
    decreaseYear() {
      this.selectedYear--;
      this.getHistories();
    },

    increaseYear() {
      this.selectedYear++;
      this.getHistories();
    },

    selectMonth(month) {
      this.selectedMonth = month.num;
      this.getHistories();
    },

    async getHistories() {
      try {
        this.isHistoryLoading = true;
        this.histories = await this.$axios.$get('/api/histories', {
          params: {
            year: this.selectedYear,
            month: this.selectedMonth
          }
        });
      } catch (err) {
        return this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isHistoryLoading = false;
      }
    },

    selectHistory() {
      this.$store.commit('mutateHistoryYear', this.selectedYear);
      this.$store.commit('mutateHistoryMonth', this.selectedMonth);
      this.saveHistoryInfoToCookie(this.selectedYear, this.selectedMonth);
    },

    saveHistoryInfoToCookie(year, month) {
      Cookies.set('historyYear', year);
      Cookies.set('historyMonth', month);
    },

    // async loadMoreHistories() {
    //   if (this.histories[this.histories.length - 1].id === 1) return;
    //   this.isMoreHistoriesLoading = true;

    //   try {
    //     const moreHistories = await this.$axios.$get('/api/histories', {
    //       params: {
    //         minId: this.histories[this.histories.length - 1].id
    //       }
    //     });

    //     this.histories = this.histories.concat(moreHistories);
    //   } catch (err) {
    //     console.error(err);
    //     return this.$nuxt.error({ statusCode: 500 });
    //   } finally {
    //     this.isMoreHistoriesLoading = false;
    //   }
    // }
  }
};