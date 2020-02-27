import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');
import nosSkeletonLoader from '@/components/nos-skeleton-loader/nos-skeleton-loader.vue';
import nosRequestLoginPopup from '@/components/nos-request-login-popup/nos-request-login-popup.vue';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  async asyncData({ params, $axios, error }) {
    try {
      let [playerName, playerId] = params.playerName.split('-');
      let comments = await $axios.$get(`/api/comments/player/${playerId}`, {
        params: {
          sortType: 'like'
        }
      });

      if (!comments.length) {
        console.log('There is no comment');
      }

      return { playerName, playerId, comments };
    } catch (err) {
      console.error(err);
    }
  },

  components: {
    nosSkeletonLoader,
    nosRequestLoginPopup
  },

  data() {
    return {
      playerCommentsCount: null,
      commentSortType: 'like',
      newCommentContent: '',
      isCommentsLoading: false,
      isMoreCommentsLoading: false,
      isCommentAdding: false,
      isCommentMalfunction: false,

      isRequestLoginPopup: false,
      nosImageUrl: process.env.NOS_IMAGE_URL
    };
  },

  computed: {
    isReadyForMoreRepliesButton() {
      return (comment) => {
        return comment.reply_count > comment.replies.length
          && comment.isRepliesLoaded
          && !comment.isMoreRepliesLoading;
      };
    },

    calculateRowsOfEditCommentTextarea() {
      return (comment) => {
        return (comment.editCommentContent.match(/\n/g)||[]).length + 1;
      };
    }
  },

  async created() {
    try {
      this.playerCommentsCount = (await this.getPlayerCommentsCount()).playerCommentsCount;
      this.commentMappingWithUiProperty(this.comments);
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    ...mapGetters(['getJwt', 'getId', 'getUsername']),

    closeModal() {
      this.$router.push(this.localePath('index'));
    },

    getPlayerCommentsCount() {
      return this.$axios.$get(`/api/comments/count/player/${this.playerId}`);
    },

    commentMappingWithUiProperty(comments) {
      comments.forEach(comment => {
        this.$set(comment, 'isReply', false);
        this.$set(comment, 'isNewReply', false);
        this.$set(comment, 'replies', []);
        this.$set(comment, 'replyContent', '');
        this.$set(comment, 'isRepliesLoaded', false);

        this.$set(comment, 'needReadMore', this.isNewLineExceed(comment.content));
        this.$set(comment, 'expanded', false);
      });
    },

    async getReplies(parentComment) {
      parentComment.replies = [];
      parentComment.isReply = true;
      parentComment.isRepliesLoaded = false;

      try {
        parentComment.replies = await this.$axios.$get(`/api/replies/player/${parentComment.id}`);
        parentComment.isRepliesLoaded = true;
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      }
    },

    async addComment() {
      if (!this.checkIsLoggedIn()) return;

      try {
        this.isCommentAdding = true;
        let addedComment = await this.$axios.$post('/api/comments/player', {
          userId: this.getId(),
          playerId: this.playerId,
          content: this.newCommentContent,
        });
        this.insertNewComment(addedComment);
        this.newCommentContent = '';
        this.isCommentAdding = false;
        this.playerCommentsCount ++;
        this.$refs.addCommentRef.reset();
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      }
    },

    insertNewComment(addedComment) {
      addedComment.replies = [];
      addedComment.isReply = false;
      addedComment.isNewReply = false;
      addedComment.replyContent = '';
      this.comments.unshift(addedComment);
    },

    async addReply(parentComment) {
      if (!this.checkIsLoggedIn()) return;

      try {
        this.$set(parentComment, 'isReplySaving', true);
        const addReplyResult = await this.$axios.$post('/api/replies/player', {
          userId: this.getId(),
          playerId: this.playerId,
          content: parentComment.replyContent,
          parentCommentsId: parentComment.id,
          parentAuthorId: parentComment.users_id
        });

        this.showAddedReply(parentComment, addReplyResult);
        parentComment.isReplySaving = false;
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      }
    },

    showAddedReply(parentComment, addReplyResult) {
      const addedReply = {
        id: addReplyResult.id,
        username: this.getUsername(),
        content: parentComment.replyContent,
        parent_comments_id: parentComment.id,
        created_at: new Date(),
        vote_up_count: 0,
        vote_down_count: 0
      };

      if (parentComment.isReply) parentComment.replies.unshift(addedReply);

      // Follow up after showing added reply
      parentComment.addedReply = addedReply;
      parentComment.isNewReply = false;
      parentComment.replyContent = '';
      parentComment.reply_count ++;
    },

    cancelReply(comment) {
      comment.isNewReply = false;
      comment.replyContent = '';
    },


    async playerOpinionVote(opinion, action) {
      if (!this.checkIsLoggedIn()) return;

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


    // Related to Edit & Delete Comment
    editComment(comment) {
      this.$set(comment, 'isEditing', true);
      this.$set(comment, 'editCommentContent', comment.content);
    },

    cancelEditComment(comment) {
      comment.isEditing = false;
    },

    async saveEditComment(targetComment) {
      try {
        this.$set(targetComment, 'isEditCommentSaving', true);
        await this.$axios.$put(`/api/comments/player/${targetComment.id}`, {
          newContent: targetComment.editCommentContent
        });

        targetComment.content = targetComment.editCommentContent;
        targetComment.isEditing = false;
        targetComment.isEditCommentSaving = false;
        targetComment.needReadMore = this.isNewLineExceed(targetComment.editCommentContent);
      } catch (err) {
        this.isCommentMalfunction = true;
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
        this.playerCommentsCount --;
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      }
    },

    reportComment(comment) {
      alert('신고했다!');
    },


    // Related to Edit & Delete Comment
    editReply(reply) {
      this.$set(reply, 'isEditing', true);
      this.$set(reply, 'editReplyContent', reply.content);
    },

    cancelEditReply(reply) {
      reply.isEditing = false;
    },

    async saveEditReply(targetReply) {
      try {
        this.$set(targetReply, 'isEditCommentSaving', true);
        await this.$axios.$put(`/api/replies/player/${targetReply.id}`, {
          newContent: targetReply.editReplyContent
        });
        targetReply.content = targetReply.editReplyContent;
        targetReply.isEditing = false;
        targetReply.isEditCommentSaving = false;
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      }
    },

    async deleteReply(parentComment, targetReply) {
      try {
        await this.$axios.$delete(`/api/replies/player/${targetReply.id}`, {
          params: {
            parentCommentsId: parentComment.id
          }
        });
        alert('삭제됐다!');

        const idx = parentComment.replies.findIndex((reply) => {
          return reply.id === targetReply.id;
        });
        if (idx > -1) parentComment.replies.splice(idx, 1);
        parentComment.reply_count --;
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      }
    },

    reportReply(reply) {
      alert('신고했다!');
    },

    initiateCommentStateBeforeSortChange() {
      this.comments = [];
    },

    async sortCommentBy(sortType) {
      this.initiateCommentStateBeforeSortChange();
      this.isCommentsLoading = true;
      this.commentSortType = sortType;

      try {
        switch (sortType) {
        case 'date' :
          this.comments = await this.$axios.$get(`/api/comments/player/${this.playerId}`, {
            params: { sortType: 'date' }
          });
          this.commentMappingWithUiProperty(this.comments);
          break;
            
        case 'like' :
        default :
          this.comments = await this.$axios.$get(`/api/comments/player/${this.playerId}`, {
            params: { sortType: 'like' }
          });
          this.commentMappingWithUiProperty(this.comments);
          break;
        }
        this.isCommentsLoading = false;
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      }
    },

    onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
      if (this.comments.length && !this.isMoreCommentsLoading && scrollTop + clientHeight >= scrollHeight) {
        this.loadMoreComments();
      }
    },

    async loadMoreComments() {
      if (this.isMoreCommentsLoading) return;
      else if (this.playerCommentsCount <= this.comments.length) return;

      const previousCommentIdList = this.comments.map((comment) => {
        return comment.id;
      });

      this.isMoreCommentsLoading = true;
      try {
        const moreComments = await this.$axios.$get(`/api/comments/player/${this.playerId}`, {
          params: {
            sortType: this.commentSortType,
            minId: this.comments[this.comments.length - 1].id,
            previousCommentIdList
          }
        });
        this.commentMappingWithUiProperty(moreComments);
        this.comments = this.comments.concat(moreComments);
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      } finally {
        this.isMoreCommentsLoading = false;
      }
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
        this.isCommentMalfunction = true;
        console.error(err);
      }
    },

    checkIsLoggedIn() {
      if (!this.getJwt()) {
        this.isRequestLoginPopup = true;
      } else {
        return true;
      }
    },

    isNewLineExceed(content) {
      return (content.match(/\n/g)||[]).length >= 4;
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