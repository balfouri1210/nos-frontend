import nosCountdown from '@/components/nos-countdown/nos-countdown.vue';
import nosSearchModal from '@/components/nos-modals/nos-search-modal/nos-search-modal.vue';
import U from '@/lib/util';

export default {
  components: {
    nosCountdown,
    nosSearchModal
  },

  data() {
    return {
      searchKeyword: null,
      suggestions: [],
      isSearching: false
    };
  },

  watch: {
    searchKeyword: U.debounce(async function() {
      try {
        if (this.searchKeyword && this.searchKeyword.length >= 2) {
          this.isSearching = true;
          this.suggestions = await this.search();
        } else {
          this.suggestions = [];
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isSearching = false;
      }
    }, 400)
  },

  methods: {
    search() {
      return this.$axios.$get(`/api/search/${this.searchKeyword}`) || [];
    },

    selectSearchItem(item) {
      this.$store.commit('player/mutatePlayerId', item.id);
      this.$store.commit('player/mutatePlayerName', item.known_as);
      U.savePlayerInfoToCookie(item.id, item.known_as);
      this.$emit('closeModal');

      // 평상시
      this.$router.push(
        this.localePath({
          name: 'index-player-playerName',
          params: {
            playerName: item.known_as
          }
        })
      );
    },

    seasonStartHandler() {
      window.location.reload();
    }
  }
};
