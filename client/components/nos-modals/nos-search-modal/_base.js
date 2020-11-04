import U from '@/lib/util';
import { eplClubs } from '@/lib/constants';
import countries from '@/lib/countries';

export default {
  data() {
    return {
      searchKeyword: null,
      expendCountryList: false,
      suggestions: [],
      isSearching: false,

      clubs: eplClubs,
      nosImageUrl: process.env.NOS_IMAGE_URL,
      countries,
      majorCountries: [209, 250, 83, 110, 76, 178, 183, 22, 157, 233, 228, 15, 32, 238, 45, 49, 144, 11, 196, 61, 162, 4, 66, 84, 39, 55]
    };
  },

  created() {
    this.majorCountries = this.countries.filter(country => {
      return this.majorCountries.indexOf(country.id) !== -1;
    });
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
      this.$emit('close-modal');

      this.$router.push(this.localePath({
        name: 'search-searchData',
        params: {
          searchData: `clubId_${club.id}`
        }
      }));
    },

    selectCountry(country) {
      this.$emit('close-modal');

      this.$router.push(this.localePath({
        name: 'search-searchData',
        params: {
          searchData: `country_${country.code.toLowerCase()}-${country.id}`
        }
      }));
    },

    searchPlayerByKeyword() {
      this.$emit('close-modal');

      this.$router.push(this.localePath({
        name: 'search-searchData',
        params: {
          searchData: `keyword_${this.searchKeyword}`
        }
      }));
    },

    selectSearchItem(item) {
      this.$emit('close-modal');

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