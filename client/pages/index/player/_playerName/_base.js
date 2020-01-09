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
      comments: null
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
          comment.isChildComment = false;
          comment.isNewChildComment = false;
          comment.childCommentContent = '';
        });
        this.comments = result.data;
      } catch (err) {
        console.error(err);
      }
    },

    async loadChildComments(parentComment) {
      try {
        if (!parentComment.isChildComment) {
          const result = await this.$axios.get(`/api/child-comments/player/${parentComment.id}`);
          parentComment.childComments = result.data;
          parentComment.isChildComment = true;
        }
      } catch (err) {
        console.error(err);
      }
    },

    async addComment() {
      let addedComment;
      try {
        addedComment = await this.$axios.post('/api/comments/player', {
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
        isChildComment: false,
        isNewChildComment: false,
        childCommentContent: ''
      });
    },

    async addChildComment(parentComment) {
      let addedChildComment;
      try {
        addedChildComment = await this.$axios.post('/api/child-comments/player', {
          userId: this.getId(),
          playerId: this.playerId,
          content: parentComment.childCommentContent,
          parentId: parentComment.id
        });
        
        this.insertNewChildComment(parentComment, addedChildComment);
        parentComment.childCommentContent = '';
      } catch (err) {
        console.error(err);
      }
    },

    insertNewChildComment(parentComment, addedChildComment) {
      if (!parentComment.childComments) parentComment.childComments = [];

      parentComment.childComments.unshift({
        id: addedChildComment.data.id,
        username: this.getUsername(),
        content: parentComment.childCommentContent
      });

      parentComment.isChildComment = true;
      parentComment.child_comment_count = 1;
    },

    voteUp() {

    },

    voteDown() {

    },

    cancelChildComment(comment) {
      comment.isNewChildComment = false;
      comment.childCommentContent = '';
    }
  }
};