import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');
import nosPlayerModalInfo from '@/components/nos-player-modal-info/nos-player-modal-info.vue';
import nosSkeletonLoader from '@/components/nos-skeleton-loader/nos-skeleton-loader.vue';
import nosNewsArea from '@/components/nos-news-area/nos-news-area.vue';
import nosYoutubeArea from '@/components/nos-youtube-area/nos-youtube-area.vue';
import nosLinkShare from '@/components/nos-link-share/nos-link-share.vue';
import nosLinkPreview from '@/components/nos-link-preview/nos-link-preview';

export default {
  components: {
    nosSkeletonLoader,
    nosPlayerModalInfo,
    nosNewsArea,
    nosYoutubeArea,
    nosLinkShare,
    nosLinkPreview
  },
  
  props: {
    history: {
      type: Object,
      default: () => {}
    },

    playerHistory: {
      type: Object,
      default: () => {}
    },

    comments: {
      type: Array,
      default: () => []
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

  created() {
    this.commentMappingWithUiProperty(this.comments);
  },

  methods: {
    ...mapGetters(['getJwt', 'getId', 'getUsername']),

    closeModal() {
      if (this.$route.name.indexOf('comment-history') !== -1) {
        this.$router.push(this.localePath({
          name: 'comment-history-historyId',
          params: {
            historyId: this.history.id,
          }
        }));
      } else {
        this.$router.push(this.localePath({
          name: 'history-historyId',
          params: {
            historyId: this.history.id
          }
        }));
      }
    },

    commentMappingWithUiProperty(comments) {
      comments.forEach(async (comment) => {
        try {
          let links = comment.content.match(/\bhttps?:\/\/\S+/gi);
          if (links) this.$set(comment, 'embedLink', links[0]);

          this.$set(comment, 'isReply', false);
          this.$set(comment, 'replies', []);
          this.$set(comment, 'isRepliesLoaded', false);
  
          this.$set(
            comment,
            'needReadMore',
            this.isNewLineExceed(comment.content)
          );
          this.$set(comment, 'expanded', false);
        } catch (err) {
          console.error(err);
        }
      });
    },

    isNewLineExceed(content) {
      return (content.match(/\n/g) || []).length >= 4;
    },

    async sortCommentBy(sortType) {
      this.isCommentsLoading = true;
      this.commentSortType = sortType;

      try {
        switch (sortType) {
        case 'date' :
          this.comments = await this.$axios.$get(`/api/histories/${this.history.id}/player/${this.playerHistory.id}/comments`, {
            params: { sortType: 'date' }
          });
          this.commentMappingWithUiProperty(this.comments);
          break;

        case 'like' :
        default :
          this.comments = await this.$axios.$get(`/api/histories/${this.history.id}/player/${this.playerHistory.id}/comments`, {
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
      else if (this.playerHistory.comment_count <= this.comments.length) return;

      this.isMoreCommentsLoading = true;
      try {
        const moreComments = await this.$axios.$get(`/api/histories/${this.history.id}/player/${this.playerHistory.id}/comments`, {
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
          `/api/histories/${this.history.id}/player/${this.playerHistory.id}/replies`, {
            params: {
              parentCommentId: parentComment.id
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
        const moreReplise = await this.$axios.$get(`/api/histories/${this.history.id}/player/${this.playerHistory.id}/replies`, {
          params: {
            maxId: parentComment.replies[parentComment.replies.length - 1].id,
            parentCommentId: parentComment.id
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

  // Scroll lock
  beforeCreate() {
    if (process.client)
      document.body.style.overflow = 'hidden';
  },
  
  beforeDestroy() {
    if (process.client)
      document.body.style.overflow = 'unset';
  }
};