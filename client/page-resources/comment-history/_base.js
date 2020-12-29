import nosHistoryPeriod from '@/components/nos-history-period/nos-history-period.vue';
import nosCommentUnit from '@/components/nos-comment-unit/nos-comment-unit.vue';

export default {
  components: {
    nosHistoryPeriod,
    nosCommentUnit
  },

  data() {
    return {
      totalCommentsCount: 0,
      totalHotCommentsCount: 0,

      newCommentUnitKey: 0, // 컴포넌트 강제 reload를 위한 변수,

      history: {}
    };
  },

  created() {
    this.getTotalCommentsCount();
    if (this.$route.params.historyId) this.getHistory();
  },

  methods: {
    async getTotalCommentsCount() {
      try {
        const result = await this.$axios.$get(`/api/histories/${this.$route.params.historyId}/player/comments/count`);
        this.totalCommentsCount = result.totalCommentsCount;
        this.totalHotCommentsCount = result.totalHotCommentsCount;
      } catch (err) {
        this.$nuxt.error({ statusCode: 500 });
      }
    },

    async getHistory() {
      try {
        this.history = await this.$axios.$get(`/api/histories/${this.$route.params.historyId}`);
      } catch (err) {
        this.$nuxt.error({ statusCode: 500 });
      }
    },

    forceRerender() {
      this.newCommentUnitKey ++;
    }
  }
};