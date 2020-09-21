import U from '@/lib/util';
import { eplClubs } from '@/lib/constants';

export default {
  data() {
    return {
      searchKeyword: null,
      suggestions: [],
      isSearching: false,

      clubs: eplClubs,
      nosImageUrl: process.env.NOS_IMAGE_URL
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
        name: 'search-searchData',
        params: {
          searchData: `clubId_${club.id}`
        }
      }));
    },

    searchPlayerByKeyword() {
      this.$emit('closeModal');

      this.$router.push(this.localePath({
        name: 'search-searchData',
        params: {
          searchData: `keyword_${this.searchKeyword}`
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