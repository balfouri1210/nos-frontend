import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');
import nosCommentUnit from '@/components/nos-comment-unit/nos-comment-unit.vue';
import nosInput from '@/components/nos-input/nos-input.vue';
import nosTextarea from '@/components/nos-textarea/nos-textarea.vue';
import U from '@/lib/util';
import countries from '@/lib/countries';

export default {
  components: {
    nosCommentUnit,
    nosInput,
    nosTextarea
  },

  data() {
    return {
      searchKeyword: null,
      isSearching: false,
      playerList: [],
      nosImageUrl: process.env.NOS_IMAGE_URL,

      selectedPlayer: null,
      quickCommentContent: null,
      isQuickCommentAdding: false,
      isRequestLoginPopup: false,

      newCommentUnitKey: 0
    };
  },

  methods: {
    ...mapGetters(['getJwt']),

    searchPlayerByKeyword() {
      return this.$axios.$get('/api/search', {
        params: {
          keyword: this.searchKeyword
        }
      }) || [];
    },

    selectPlayer(player) {
      this.searchKeyword = null;
      this.selectedPlayer = player;
      this.$set(this.selectedPlayer, 'country_name', countries.find(country => {
        return country.code === this.selectedPlayer.country_code;
      }).name);
      this.playerList = [];
    },

    cancelQuickComment() {
      this.selectedPlayer = null;
    },

    async addQuickComment() {
      if (!this.getJwt()) { this.isRequestLoginPopup = true; return; }

      try {
        this.isQuickCommentAdding = true;
        await this.$axios.$post('/api/comments/player', {
          playerId: this.selectedPlayer.id,
          content: this.quickCommentContent,
        });
        this.quickCommentContent = '';
        this.$refs.quickCommentRef.reset();
        this.forceRerender();
      } catch (err) {
        this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isQuickCommentAdding = false;
      }
    },

    forceRerender() {
      this.newCommentUnitKey ++;
    }
  },

  watch: {
    searchKeyword: U.debounce(async function() {
      try {
        if (this.searchKeyword && this.searchKeyword.length >= 2) {
          this.isSearching = true;
          this.playerList = await this.searchPlayerByKeyword();
        } else {
          this.playerList = [];
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isSearching = false;
      }
    }, 400)
  }
};