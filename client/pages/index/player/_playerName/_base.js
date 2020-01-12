import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  asyncData({ params }) {
    let [playerName, playerId] = params.playerName.split('-');
    playerId = parseInt(playerId);
    return { playerName, playerId };
  },

  created() {
    this.getComments();
  },

  data() {
    return {
      newCommentContent: '',
      comments: null,
      commentVoteHistories: null
    };
  },

  methods: {
    ...mapGetters(['getJwt', 'getId', 'getUsername']),

    closeModal() {
      this.$router.push(this.localePath('index'));
    },

    commentMappingWithVoteHistory(comment) {
      this.commentVoteHistories.forEach(history => {
        if (history.targetId === comment.id) {
          comment.isVoted = history.vote;
        }
      });
    },

    async getComments() {
      try {
        const result = await this.$axios.get(`/api/comments/player/${this.playerId}`);
        if (this.getJwt()) await this.getCommentVoteHistories();
        
        result.data.forEach(comment => {
          comment.isReply = false;
          comment.isNewReply = false;
          comment.replyContent = '';

          if (this.getJwt()) this.commentMappingWithVoteHistory(comment);
        });

        this.comments = result.data;
      } catch (err) {
        console.error(err);
      }
    },

    async getCommentVoteHistories() {
      try {
        const result = await this.$axios.get(`/api/vote-histories/player-comment/${this.getId()}`);
        this.commentVoteHistories = result.data;
      } catch (err) {
        console.error(err);
      }
    },

    async loadReplies(parentComment) {
      try {
        if (!parentComment.isReply) {
          const result = await this.$axios.get(`/api/replies/player/${parentComment.id}`);
          parentComment.replies = result.data;
          parentComment.isReply = true;
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

      parentComment.addedReply = addedReply;
      parentComment.isNewReply = false;
      parentComment.replyContent = '';
      parentComment.reply_count ++;
    },

    async playerCommentVote(comment, action) {
      if (!comment.isVoted) {
        // 첫 투표
        try {
          await this.doVote(comment, action);
          comment[`vote_${action}_count`] ++;
          comment.isVoted = action;
        } catch (err) {
          console.error(err);
        }
      } else if (comment.isVoted === action) {
        // 투표 취소
        try {
          await this.cancelVote(comment, action);
          comment[`vote_${action}_count`] --;
          comment.isVoted = null;
        } catch (err) {
          console.error(err);
        }
      } else {
        // 투표 반전
        alert('You\'ve already voted!');
      }
    },

    doVote(comment, action) {
      return this.$axios.put('/api/vote', {
        userId: this.getId(),
        targetTable: 'player_comments',
        targetId: comment.id,
        action
      });
    },

    cancelVote(comment, action) {
      return this.$axios.put('/api/vote/cancel', {
        userId: this.getId(),
        targetTable: 'player_comments',
        targetId: comment.id,
        action
      });
    },

    cancelReply(comment) {
      comment.isNewReply = false;
      comment.replyContent = '';
    }
  }
};