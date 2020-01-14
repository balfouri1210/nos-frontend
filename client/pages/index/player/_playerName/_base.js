import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');
import nosSkeletonLoader from '@/components/nos-skeleton-loader/nos-skeleton-loader.vue';

export default {
  asyncData({ params }) {
    let [playerName, playerId] = params.playerName.split('-');
    playerId = parseInt(playerId);
    return { playerName, playerId };
  },

  components: {
    nosSkeletonLoader
  },

  created() {
    this.makeComments();
  },

  data() {
    return {
      newCommentContent: '',
      comments: null,
      isCommentsLoading: true,
    };
  },

  methods: {
    ...mapGetters(['getJwt', 'getId', 'getUsername']),

    closeModal() {
      this.$router.push(this.localePath('index'));
    },
    
    commentMappingWithUiProperty(comments) {
      comments.forEach(comment => {
        comment.isReply = false;
        comment.isNewReply = false;
        comment.isRepliesLoading = true;
        comment.replyContent = '';
      });
    },
    
    async makeComments() {
      try {
        // Get comments
        const getCommentsResult = (await this.getComments()).data;
        // Mapping with properties that using in UI
        this.commentMappingWithUiProperty(getCommentsResult);
        // End comments loading UI (v-skeleton-loader)
        this.comments = getCommentsResult;
        this.isCommentsLoading = false;
      } catch (err) {
        console.error(err);
      }
    },

    getComments() {
      return this.$axios.get(`/api/comments/player/${this.getId()}/${this.playerId}`);
    },

    async loadReplies(parentComment) {
      try {
        if (!parentComment.isReply) {
          parentComment.isReply = true;

          // this.$set makes 'replies' property REACTIVATE
          // That means without it, you can't update the change of 'replies'
          if (parentComment.isRepliesLoading) {
            this.$set(parentComment, 'replies', (await this.$axios.get(`/api/replies/player/${this.getId()}/${parentComment.id}`)).data);
            parentComment.isRepliesLoading = false;
          }
        }
      } catch (err) {
        console.error(err);
      }
    },

    async addComment() {
      try {
        let addedComment = await this.$axios.post('/api/comments/player', {
          userId: this.getId(),
          playerId: this.playerId,
          content: this.newCommentContent,
        });
        this.insertNewComment(addedComment);
        this.newCommentContent = '';
      } catch (err) {
        console.error(err);
      }
    },

    insertNewComment(addedComment) {
      this.comments.unshift({
        id: addedComment.data.id,
        username: this.getUsername(),
        content: this.newCommentContent,
        vote_up_count: 0,
        vote_down_count: 0,
        isReply: false,
        isNewReply: false,
        replyContent: ''
      });
    },

    async addReply(parentComment) {
      try {
        const addReplyResult = await this.$axios.post('/api/replies/player', {
          userId: this.getId(),
          playerId: this.playerId,
          content: parentComment.replyContent,
          parentId: parentComment.id
        });
        
        this.showAddedReply(parentComment, addReplyResult);
      } catch (err) {
        console.error(err);
      }
    },

    showAddedReply(parentComment, addReplyResult) {
      const addedReply = {
        id: addReplyResult.data.id,
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
      if (!this.getJwt()) return;

      if (!opinion.isVoted) {
        // 첫 투표
        try {
          await this.doVote(opinion, action);
          opinion[`vote_${action}_count`] ++;
          opinion.isVoted = action;
        } catch (err) {
          console.error(err);
        }
      } else if (opinion.isVoted === action) {
        // 투표 취소
        try {
          await this.cancelVote(opinion, action);
          opinion[`vote_${action}_count`] --;
          opinion.isVoted = null;
        } catch (err) {
          console.error(err);
        }
      } else {
        // 투표 반전
        alert('You\'ve already voted!');
      }
    },

    doVote(opinion, action) {
      return this.$axios.put('/api/vote', {
        userId: this.getId(),
        targetOpinion: opinion.parent_id ? 'player_replies' : 'player_comments',
        targetId: opinion.id,
        action
      });
    },

    cancelVote(opinion, action) {
      return this.$axios.put('/api/vote/cancel', {
        userId: this.getId(),
        targetOpinion: opinion.parent_id ? 'player_replies' : 'player_comments',
        targetId: opinion.id,
        action
      });
    },

    cancelReply(comment) {
      comment.isNewReply = false;
      comment.replyContent = '';
    }
  }
};