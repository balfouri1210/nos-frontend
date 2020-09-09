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

      totalCommentsCount: 0,
      totalHotCommentsCount: 0,

      newCommentUnitKey: 0 // 컴포넌트 강제 reload를 위한 변수
    };
  },

  created() {
    this.getTotalCommentsCount();
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

    async getTotalCommentsCount() {
      try {
        const result = await this.$axios.$get('/api/comments/count');
        this.totalCommentsCount = result.totalCommentsCount;
        this.totalHotCommentsCount = result.totalHotCommentsCount;
      } catch (err) {
        this.$nuxt.error({ statusCode: 500 });
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