import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');
import nosPlayerModalInfo from '@/components/nos-player-modal-info/nos-player-modal-info.vue';
import nosSkeletonLoader from '@/components/nos-skeleton-loader/nos-skeleton-loader.vue';
import nosYoutubeArea from '@/components/nos-youtube-area/nos-youtube-area.vue';
import nosYoutubePlayer from '@/components/nos-youtube-player/nos-youtube-player.vue';
import nosLinkCopy from '@/components/nos-link-copy/nos-link-copy.vue';

export default {
  components: {
    nosSkeletonLoader,
    nosPlayerModalInfo,
    nosYoutubeArea,
    nosYoutubePlayer,
    nosLinkCopy
  },

  async asyncData({ $axios, error, params }) {
    const historyId = params.historyId;
    const playerId = params.playerId;

    function getPlayerHistory() {
      return $axios.$get(`/api/histories/${historyId}/player/${playerId}`);
    }

    function getCommentHistories() {
      return $axios.$get(`/api/histories/${historyId}/player/${playerId}/comments`, {
        params: {
          sortType: 'like'
        }
      });
    }

    try {
      const [player, comments] = await Promise.all([
        getPlayerHistory(),
        getCommentHistories()
      ]);

      return { historyId, playerId, player, comments };
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

      nosImageUrl: process.env.NOS_IMAGE_URL,
      nosUrl: process.env.NOS_URL,

      isYoutubePlayer: false,
      selectedYoutubeVideoId: null,

      isShareUrlCopied: false
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
    },

    previousCommentIdList() {
      const previousCommentIdList = this.comments.map((comment) => {
        return comment.id;
      });

      return previousCommentIdList.toString();
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
      this.$router.push(this.localePath({
        name: 'history-historyId',
        params: {
          historyId: this.$route.params.historyId
        }
      }));
      // this.$router.go(-1);
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

    async sortCommentBy(sortType) {
      // this.comments = [];
      this.isCommentsLoading = true;
      this.commentSortType = sortType;

      try {
        switch (sortType) {
        case 'date' :
          this.comments = await this.$axios.$get(`/api/histories/${this.historyId}/player/${this.playerId}/comments`, {
            params: { sortType: 'date' }
          });
          this.commentMappingWithUiProperty(this.comments);
          break;

        case 'like' :
        default :
          this.comments = await this.$axios.$get(`/api/histories/${this.historyId}/player/${this.playerId}/comments`, {
            params: { sortType: 'like' }
          });
          this.commentMappingWithUiProperty(this.comments);
          break;
        }
        this.isCommentsLoading = false;
      } catch (err) {
        console.error(err);
        this.isCommentMalfunction = true;
      }
    },

    async loadMoreComments() {
      if (this.isMoreCommentsLoading) return;
      else if (this.player.comment_count <= this.comments.length) return;

      this.isMoreCommentsLoading = true;
      try {
        const moreComments = await this.$axios.$get(`/api/histories/${this.historyId}/player/${this.playerId}/comments`, {
          params: {
            sortType: this.commentSortType,
            minId: this.comments[this.comments.length - 1].id,
            previousCommentIdList: this.previousCommentIdList
          }
        });
        this.commentMappingWithUiProperty(moreComments);
        this.comments = this.comments.concat(moreComments);
      } catch (err) {
        console.error(err);
        this.isCommentMalfunction = true;
      } finally {
        this.isMoreCommentsLoading = false;
      }
    },


    async getReplies(parentComment) {
      parentComment.replies = [];
      parentComment.isReply = true;
      parentComment.isRepliesLoaded = false;

      try {
        parentComment.replies = await this.$axios.$get(
          `/api/histories/${this.historyId}/player/${this.playerId}/replies`, {
            params: {
              parentCommentsId: parentComment.id
            }
          }
        );
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      } finally {
        parentComment.isRepliesLoaded = true;
      }
    },

    async loadMoreReplies(parentComment) {
      if (parentComment.reply_count <= parentComment.replies.length) return;
      this.$set(parentComment, 'isMoreRepliesLoading', true);
      try {
        const moreReplise = await this.$axios.$get(`/api/histories/${this.historyId}/player/${this.playerId}/replies`, {
          params: {
            maxId: parentComment.replies[parentComment.replies.length - 1].id,
            parentCommentsId: parentComment.id
          }
        });
        parentComment.replies = parentComment.replies.concat(moreReplise);
        parentComment.isMoreRepliesLoading = false;
      } catch (err) {
        console.error(err);
        this.isCommentMalfunction = true;
      }
    },

    selectYoutubeVideoHandler(videoId) {
      this.selectedYoutubeVideoId = videoId;
      this.isYoutubePlayer = true;
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