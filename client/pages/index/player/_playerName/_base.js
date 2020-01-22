import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');
import nosSkeletonLoader from '@/components/nos-skeleton-loader/nos-skeleton-loader.vue';

export default {
  async asyncData({ params, $axios, store }) {
    function getComments (playerId) {
      return $axios.$get(`/api/comments/player/${playerId}`);
    }
    
    function commentMappingWithUiProperty(comments) {
      comments.forEach(comment => {
        comment.isReply = false;
        comment.isNewReply = false;
        comment.isRepliesLoading = true;
        comment.replyContent = '';
      });
    }

    try {
      let [playerName, playerId] = params.playerName.split('-');
      playerId = parseInt(playerId);

      let comments = await getComments(playerId);
      commentMappingWithUiProperty(comments);
      return { playerName, playerId, comments };
    } catch (err) {
      console.error(err);
    }
  },

  components: {
    nosSkeletonLoader
  },

  data() {
    return {
      newCommentContent: '',
      isCommentAdding: false
    };
  },

  computed: {
    replyCountForSkeletonLoader() {
      return (reply_count) => {
        return reply_count < 5 ? reply_count : 5;
      };
    }
  },

  methods: {
    ...mapGetters(['getJwt', 'getId', 'getUsername']),

    closeModal() {
      this.$router.push(this.localePath('index'));
    },

    async loadReplies(parentComment) {
      try {
        if (!parentComment.isReply) {
          parentComment.isReply = true;

          // this.$set makes 'replies' property REACTIVATE
          // That means without it, you can't update the change of 'replies'
          if (parentComment.isRepliesLoading) {
            this.$set(parentComment, 'replies', await this.$axios.$get(`/api/replies/player/${this.getId()}/${parentComment.id}`));
            parentComment.isRepliesLoading = false;
          }
        }
      } catch (err) {
        console.error(err);
      }
    },

    async addComment() {
      this.isCommentAdding = true;

      try {
        let addedComment = await this.$axios.$post('/api/comments/player', {
          userId: this.getId(),
          playerId: this.playerId,
          content: this.newCommentContent,
        });
        this.insertNewComment(addedComment);
        this.newCommentContent = '';
        this.isCommentAdding = false;
      } catch (err) {
        console.error(err);
      }
    },

    insertNewComment(addedComment) {
      addedComment.isReply = false;
      addedComment.isNewReply = false;
      addedComment.isRepliesLoading = true;
      addedComment.replyContent = '';
      this.comments.unshift(addedComment);
    },

    async addReply(parentComment) {
      try {
        this.$set(parentComment, 'isReplySaving', true);
        const addReplyResult = await this.$axios.$post('/api/replies/player', {
          userId: this.getId(),
          playerId: this.playerId,
          content: parentComment.replyContent,
          parentCommentId: parentComment.id,
          parentAuthorId: parentComment.users_id
        });
        
        this.showAddedReply(parentComment, addReplyResult);
        parentComment.isReplySaving = false;
      } catch (err) {
        console.error(err);
      }
    },

    showAddedReply(parentComment, addReplyResult) {
      const addedReply = {
        id: addReplyResult.id,
        username: this.getUsername(),
        content: parentComment.replyContent
      };

      if (parentComment.isReply) {
        parentComment.replies.unshift(addedReply);
      }

      // Follow up after showing added reply
      parentComment.addedReply = addedReply;
      parentComment.isNewReply = false;
      parentComment.replyContent = '';
      parentComment.reply_count ++;
    },

    async playerOpinionVote(opinion, action) {
      if (!this.getJwt()) alert('login please');

      if (!opinion.isVoted) {
        // 첫 투표
        try {
          opinion.isVoted = action;
          opinion[`vote_${action}_count`] ++;
          await this.doVote(opinion, action);
        } catch (err) {
          console.error(err);
        }
      } else if (opinion.isVoted === action) {
        // 투표 취소
        try {
          opinion[`vote_${action}_count`] --;
          opinion.isVoted = null;
          await this.cancelVote(opinion, action);
        } catch (err) {
          console.error(err);
        }
      } else {
        // 투표 반전
        alert('이미 투표했다 :(');
      }
    },

    doVote(opinion, action) {
      return this.$axios.$put('/api/vote', {
        targetAuthorId: opinion.users_id,
        targetOpinion: opinion.parent_comments_id ? 'player_replies' : 'player_comments',
        targetOpinionId: opinion.id,
        userId: this.getId(),
        action
      });
    },

    cancelVote(opinion, action) {
      return this.$axios.$put('/api/vote/cancel', {
        targetAuthorId: opinion.users_id,
        targetOpinion: opinion.parent_comments_id ? 'player_replies' : 'player_comments',
        targetOpinionId: opinion.id,
        userId: this.getId(),
        action
      });
    },

    cancelReply(comment) {
      comment.isNewReply = false;
      comment.replyContent = '';
    },

    editComment(comment) {
      this.$set(comment, 'isEditing', true);
    },

    cancelEditComment(comment) {
      comment.isEditing = false;
    },

    async saveEditComment(targetComment) {
      try {
        this.$set(targetComment, 'isEditCommentSaving', true);
        await this.$axios.$put(`/api/comments/player/${targetComment.id}`, {
          newContent: targetComment.content
        });
        targetComment.isEditing = false;
        targetComment.isEditCommentSaving = false;
      } catch (err) {
        console.error(err);
      }
    },

    async deleteComment(targetComment) {
      try {
        await this.$axios.$delete(`/api/comments/player/${targetComment.id}`);
        alert('삭제됐다!');

        const idx = this.comments.findIndex((comment) => {
          return comment.id === targetComment.id;
        });
        if (idx > -1) this.comments.splice(idx, 1);
      } catch (err) {
        console.error(err);
      }
    },

    reportComment(comment) {
      alert('신고했다!');
    }
  }
};