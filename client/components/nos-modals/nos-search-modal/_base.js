import U from '@/lib/util';
import { eplClubs } from '@/lib/constants';

export default {
  data() {
    return {
      searchKeyword: null,
      suggestions: [],
      isSearching: false,

      clubs: eplClubs
    };
  },

  methods: {
    loadSuggestionsByKeyword() {
      return this.$axios.$get('/api/search', {
        params: {
          keyword: this.searchKeyword
        }
      }) || [];
    },

    selectClub(club) {
      this.$emit('closeModal');

      this.$router.push(this.localePath({
        name: 'search',
        query: {
          clubId: club.id
        }
      }));
    },

    searchPlayerByKeyword() {
      this.$emit('closeModal');

      this.$router.push(this.localePath({
        name: 'search',
        query: {
          keyword: this.searchKeyword
        }
      }));
    },

    selectSearchItem(item) {
      this.$emit('closeModal');

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
          this.suggestions = await this.loadSuggestionsByKeyword();
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