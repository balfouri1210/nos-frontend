import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');
import nosPlayerModalInfo from '@/components/nos-player-modal-info/nos-player-modal-info.vue';
import nosSkeletonLoader from '@/components/nos-skeleton-loader/nos-skeleton-loader.vue';

export default {
  components: {
    nosSkeletonLoader,
    nosPlayerModalInfo
  },

  async asyncData({ store, $axios, error }) {
    const playerId = store.getters['player/getPlayerId'];

    function getPlayer() {
      return $axios.$get(`/api/players/${playerId}`);
    }

    function getComments() {
      return $axios.$get(`/api/comments/player/${playerId}`, {
        params: {
          sortType: 'like'
        }
      });
    }

    try {
      const [player, comments] = await Promise.all([
        getPlayer(),
        getComments()
      ]);

      return { playerId, player, comments };
    } catch (err) {
      console.error(err);
      error({ statusCode: 500 });
    }
  },

  data() {
    return {
      commentSortType: 'like',
      isCommentsLoading: false,
      isMoreCommentsLoading: false,

      nosImageUrl: process.env.NOS_IMAGE_URL
    };
  },

  computed: {
    isReadyForMoreRepliesButton() {
      return comment => {
        return (
          comment.reply_count > comment.replies.length &&
          comment.isRepliesLoaded &&
          !comment.isMoreRepliesLoading
        );
      };
    }
  },

  async created() {
    try {
      this.commentMappingWithUiProperty(this.comments);
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    ...mapGetters(['getJwt', 'getId', 'getUsername']),

    closeModal() {
      this.$router.go(-1);
    },

    async getReplies(parentComment) {
      parentComment.replies = [];
      parentComment.isReply = true;
      parentComment.isRepliesLoaded = false;

      try {
        parentComment.replies = await this.$axios.$get(
          `/api/replies/player/${parentComment.id}`
        );
        parentComment.isRepliesLoaded = true;
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      }
    },

    commentMappingWithUiProperty(comments) {
      comments.forEach(comment => {
        this.$set(comment, 'isReply', false);
        this.$set(comment, 'replies', []);
        this.$set(comment, 'isRepliesLoaded', false);

        this.$set(
          comment,
          'needReadMore',
          this.isNewLineExceed(comment.content)
        );
        this.$set(comment, 'expanded', false);
      });
    },

    isNewLineExceed(content) {
      return (content.match(/\n/g) || []).length >= 4;
    },

    async loadMoreReplies(parentComment) {
      if (parentComment.reply_count <= parentComment.replies.length) return;
      this.$set(parentComment, 'isMoreRepliesLoading', true);
      try {
        const moreReplise = await this.$axios.$get(`/api/replies/player/${parentComment.id}`, {
          params: {
            maxId: parentComment.replies[parentComment.replies.length - 1].id
          }
        });
        parentComment.replies = parentComment.replies.concat(moreReplise);
        parentComment.isMoreRepliesLoading = false;
      } catch (err) {
        console.error(err);
        this.isCommentMalfunction = true;
      }
    }
  },

  // Body scroll lock
  beforeRouteEnter(to, from, next) {
    if (process.client) document.documentElement.style.overflow = 'hidden';
    next();
  },
  
  // Body scroll release
  beforeRouteLeave(to, from ,next) {
    if (process.client) document.documentElement.style.overflow = 'auto';
    next();
  }
};