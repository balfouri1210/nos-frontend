import U from '@/lib/util';

export default {
  data() {
    return {
      searchKeyword: null,
      suggestions: [],
      isSearching: false,

      clubs: null
    };
  },

  created() {
    this.getClubs();
  },

  methods: {
    async getClubs() {
      try {
        this.clubs = await this.$axios.$get('/api/clubs', {
          params: {
            leagueId: 1
          }
        });
      } catch (err) {
        console.error(err);
      }
    },

    searchPlayerByKeyword() {
      return this.$axios.$get(`/api/search/${this.searchKeyword}`) || [];
    },

    async selectClub(club) {
      try {
        this.suggestions = await this.$axios.$get(`/api/search/club/${club.id}`) || [];
      } catch (err) {
        console.error(err);
      }
    },

    selectSearchItem(item) {
      this.$emit('closeModal');

      // 평상시
      this.$router.push(
        this.localePath({
          name: 'index-player-playerId-playerName',
          params: {
            playerId: item.id,
            playerName: item.known_as.toLowerCase().replace(/ /g, '-')
          }
        })
      );
    }
  },

  watch: {
    searchKeyword: U.debounce(async function() {
      try {
        if (this.searchKeyword && this.searchKeyword.length >= 2) {
          this.isSearching = true;
          this.suggestions = await this.searchPlayerByKeyword();
        } else {
          this.suggestions = [];
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isSearching = false;
      }
    }, 400)
  }
};