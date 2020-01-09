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
      // addedReply: {}
    };
  },

  methods: {
    ...mapGetters(['getId', 'getUsername']),

    closeModal() {
      this.$router.push(this.localePath('index'));
    },

    async getComments() {
      try {
        const result = await this.$axios.get(`/api/comments/player/${this.playerId}`);
        result.data.forEach(comment => {
          comment.isReply = false;
          comment.isNewReply = false;
          comment.replyContent = '';
        });
        this.comments = result.data;
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
        vote_up: 0,
        vote_down: 0,
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

    voteUp() {

    },

    voteDown() {

    },

    cancelReply(comment) {
      comment.isNewReply = false;
      comment.replyContent = '';
    }
  }
};