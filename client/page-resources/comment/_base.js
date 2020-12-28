import nosQuickComment from '@/components/nos-quick-comment/nos-quick-comment.vue';
import nosCommentUnit from '@/components/nos-comment-unit/nos-comment-unit.vue';

export default {
  components: {
    nosQuickComment,
    nosCommentUnit
  },

  data() {
    return {
      totalCommentsCount: 0,
      totalHotCommentsCount: 0,

      newCommentUnitKey: 0, // 컴포넌트 강제 reload를 위한 변수,

      historyInfo: {}
    };
  },

  created() {
    this.getTotalCommentsCount();
    if (this.$route.query.historyId) this.getHistoryInfo();
  },

  methods: {
    async getTotalCommentsCount() {
      try {
        const getCommentsCountUrl = this.$route.query.historyId ?
          `/api/histories/${this.$route.query.historyId}/player/comments/count` : '/api/comments/count';
        const result = await this.$axios.$get(getCommentsCountUrl);

        this.totalCommentsCount = result.totalCommentsCount;
        this.totalHotCommentsCount = result.totalHotCommentsCount;
      } catch (err) {
        this.$nuxt.error({ statusCode: 500 });
      }
    },

    async getHistoryInfo() {
      try {
        this.historyInfo = await this.$axios.$get(`/api/histories/${this.$route.query.historyId}`);
      } catch (err) {
        this.$nuxt.error({ statusCode: 500 });
      }
    },

    forceRerender() {
      this.newCommentUnitKey ++;
    }
  }
};