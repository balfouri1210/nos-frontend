import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');
import nosSkeletonLoader from '@/components/nos-skeleton-loader/nos-skeleton-loader.vue';
import nosPlayerModalInfo from '@/components/nos-player-modal-info/nos-player-modal-info.vue';
import nosYoutubeArea from '@/components/nos-youtube-area/nos-youtube-area.vue';
import nosFixturesArea from '@/components/nos-fixtures-area/nos-fixtures-area.vue';
import nosNewsArea from '@/components/nos-news-area/nos-news-area.vue';
import nosYoutubePlayer from '@/components/nos-youtube-player/nos-youtube-player.vue';
import nosLinkShare from '@/components/nos-link-share/nos-link-share.vue';
import nosTextarea from '@/components/nos-textarea/nos-textarea.vue';
import nosLinkPreview from '@/components/nos-link-preview/nos-link-preview';
// import Cookies from 'js-cookie';

export default {
  props: {
    player: {
      type: Object,
      default: {}
    },

    initialComments: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  components: {
    nosSkeletonLoader,
    nosPlayerModalInfo,
    nosYoutubeArea,
    nosFixturesArea,
    nosNewsArea,
    nosYoutubePlayer,
    nosLinkShare,
    nosTextarea,
    nosLinkPreview
  },

  data() {
    return {
      // playerId, playerName을 route param에서 먼저 찾도록 한 이유:
      // url로 직접 들어왔을때 this.player가 없는 상태이기 때문
      playerId: this.$route.params.playerId || this.player.id,
      playerName: this.$route.params.playerName || this.player.known_as,

      comments: null,
      commentSortType: 'date',
      newCommentContent: '',
      isCommentsLoading: false,
      isMoreCommentsLoading: false,
      isCommentAdding: false,
      isCommentMalfunction: false,
      linkPreviewResetKey: 0,

      isRequestLoginPopup: false,
      nosImageUrl: process.env.NOS_IMAGE_URL,

      isYoutubePlayer: false,
      selectedYoutubeVideoId: null,

      isReportDialog: false,
      reportTargetObject: null,
      reportReason: null,
      isReportSaved: false,

      isOpinionVoting: false,

      isShareUrlCopied: false,

      // FOR FAKE COMMENT
      fakeUsername: '',
      fakeCommentContent: ''
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
    },


    previousCommentIdList() {
      const previousCommentIdList = this.comments.map((comment) => {
        return comment.id;
      });

      return previousCommentIdList.toString();
    },

    linkToShare() {
      return `${process.env.NOS_URL}${this.$route.fullPath}`;
    }
  },

  created() {
    if (this.player.comment_count < 0) this.player.comment_count = 0;

    this.comments = this.initialComments.slice(); // 최초 댓글들 복사
    if (this.comments) this.commentMappingWithUiProperty(this.comments);
  },

  methods: {
    ...mapGetters(['getJwt', 'getId', 'getUsername']),

    copySuccess() {
      this.isShareUrlCopied = true;
    },


    // ///////////////// //
    // COMMENT 관련 메소드  //
    // ///////////////// //
    commentMappingWithUiProperty(comments) {
      comments.forEach(async (comment) => {
        try {
          let links = comment.content.match(/\bhttps?:\/\/\S+/gi);
          if (links) this.$set(comment, 'embedLink', links[0]); 
  
          this.$set(comment, 'isReply', false);
          this.$set(comment, 'isNewReply', false);
          this.$set(comment, 'replies', []);
          this.$set(comment, 'replyContent', '');
          this.$set(comment, 'isRepliesLoaded', false);
  
          this.$set(comment, 'needReadMore', this.isNewLineExceed(comment.content));
          this.$set(comment, 'expanded', false);
        } catch (err) {
          console.error(err);
        }
      });
    },

    async addComment() {
      if (!this.checkIsLoggedIn()) return;

      try {
        this.isCommentAdding = true;
        let addedComment = await this.$axios.$post('/api/comments/player', {
          playerId: this.playerId,
          content: this.newCommentContent,
        });
        this.insertNewComment(addedComment);
        this.newCommentContent = '';
        this.player.comment_count ++;
        this.$refs.addCommentRef.reset();
        this.linkPreviewResetKey ++;
      } catch (err) {
        this.isCommentMalfunction = true;
      } finally {
        this.isCommentAdding = false;
      }
    },

    insertNewComment(addedComment) {
      addedComment.replies = [];
      addedComment.isReply = false;
      addedComment.isNewReply = false;
      addedComment.replyContent = '';
      addedComment.needReadMore = this.isNewLineExceed(addedComment.content);
      addedComment.expanded = false;
      this.comments.unshift(addedComment);
    },

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
        targetComment.needReadMore = this.isNewLineExceed(targetComment.editCommentContent);
      } catch (err) {
        console.error(err);
        this.isCommentMalfunction = true;
      } finally {
        targetComment.isEditCommentSaving = false;
      }
    },

    async deleteComment(targetComment) {
      try {
        await this.$axios.$delete(`/api/comments/player/${this.playerId}/${targetComment.id}`);
        alert('It was deleted successfully.');

        const idx = this.comments.findIndex((comment) => {
          return comment.id === targetComment.id;
        });
        if (idx > -1) this.comments.splice(idx, 1);
        this.player.comment_count --;
        this.linkPreviewResetKey ++;
      } catch (err) {
        console.error(err);
        this.isCommentMalfunction = true;
      }
    },

    async sortCommentBy(sortType) {
      // this.comments = [];
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
        console.error(err);
        this.isCommentMalfunction = true;
      }
    },

    async loadMoreComments() {
      if (this.isMoreCommentsLoading) return;
      else if (this.player.comment_count <= this.comments.length) return;

      this.isMoreCommentsLoading = true;
      try {
        const moreComments = await this.$axios.$get(`/api/comments/player/${this.playerId}`, {
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




    // /////////////// //
    // REPLY 관련 메소드  //
    // /////////////// //
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

    async addReply(parentComment) {
      if (!this.checkIsLoggedIn()) return;

      try {
        this.$set(parentComment, 'isReplySaving', true);
        const addReplyResult = await this.$axios.$post('/api/replies/player', {
          playerId: this.playerId,
          content: parentComment.replyContent,
          parentCommentId: parentComment.id,
          parentAuthorId: parentComment.user_id
        });

        this.showAddedReply(parentComment, addReplyResult);
      } catch (err) {
        this.isCommentMalfunction = true;
        console.error(err);
      } finally {
        parentComment.isReplySaving = false;
      }
    },

    showAddedReply(parentComment, addReplyResult) {
      const addedReply = {
        id: addReplyResult.id,
        username: this.getUsername(),
        content: parentComment.replyContent,
        parent_comment_id: parentComment.id,
        created_at: new Date(),
        vote_up_count: 0,
        vote_down_count: 0,
        user_id: this.getId()
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

    editReply(reply) {
      this.$set(reply, 'isEditing', true);
      this.$set(reply, 'editReplyContent', reply.content);
    },

    cancelEditReply(reply) {
      reply.isEditing = false;
    },

    async saveEditReply(targetReply) {
      try {
        this.$set(targetReply, 'isEditReplySaving', true);
        await this.$axios.$put(`/api/replies/player/${targetReply.id}`, {
          newContent: targetReply.editReplyContent
        });
        targetReply.content = targetReply.editReplyContent;
        targetReply.isEditing = false;
      } catch (err) {
        console.error(err);
        this.isCommentMalfunction = true;
      } finally {
        targetReply.isEditReplySaving = false;
      }
    },

    async deleteReply(parentComment, targetReply) {
      try {
        await this.$axios.$delete(`/api/replies/player/${targetReply.id}`, {
          params: {
            parentCommentId: parentComment.id
          }
        });
        alert('It was deleted successfully.');

        const idx = parentComment.replies.findIndex((reply) => {
          return reply.id === targetReply.id;
        });
        if (idx > -1) parentComment.replies.splice(idx, 1);
        parentComment.reply_count --;
      } catch (err) {
        console.error(err);
        this.isCommentMalfunction = true;
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
        console.error(err);
        this.isCommentMalfunction = true;
      }
    },



    // 기타 기능들
    async votePlayerOpinion(opinion, vote) {
      if (!this.checkIsLoggedIn()) return;

      try {
        this.isOpinionVoting = true;
        const previousVote = opinion.vote;

        if (opinion.vote) {
          if (opinion.vote === vote) {
            // 이미 한 투표와 같은 표 선택 : 투표 취소
            opinion[`vote_${opinion.vote}_count`] --;
            opinion.vote = null;

            await this.requestCancelVotePlayerOpinion(opinion, previousVote);
          } else {
            // 이미 한 투표와 다른 표 선택
            opinion[`vote_${opinion.vote}_count`] --;
            opinion[`vote_${vote}_count`] ++;
            opinion.vote = vote;

            await this.updateVotePlayerOpinion(opinion, previousVote, vote);
          }
        } else {
          // 일반 투표
          opinion[`vote_${vote}_count`] ++;
          opinion.vote = vote;
          await this.requestVotePlayerOpinion(opinion, vote);
        }
      } catch (err) {
        alert('Oh no! We were unable to process your request. Please try again or Contact us.');
        // return this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isOpinionVoting = false;
      }
    },

    requestVotePlayerOpinion(opinion, vote) {
      return this.$axios.$post('/api/vote/opinion', {
        targetAuthorId: opinion.user_id,
        targetOpinion: opinion.parent_comment_id ? 'player_reply' : 'player_comment',
        targetOpinionId: opinion.id,
        vote
      });
    },

    updateVotePlayerOpinion(opinion, previousVote, vote) {
      return this.$axios.$put('/api/vote/opinion', {
        targetOpinion: opinion.parent_comment_id ? 'player_reply' : 'player_comment',
        targetOpinionId: opinion.id,
        previousVote,
        vote
      });
    },

    requestCancelVotePlayerOpinion(opinion, vote) {
      return this.$axios.$delete('/api/vote/opinion', {
        params: {
          targetOpinion: opinion.parent_comment_id ? 'player_reply' : 'player_comment',
          targetOpinionId: opinion.id,
          vote
        }
      });
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
    },

    openReportDialog(opinion) {
      this.isReportDialog = true;
      this.reportTargetObject = opinion;
    },

    async saveReport() {
      try {
        const type = this.reportTargetObject.parent_comment_id ? 'replies' : 'comments';
  
        await this.$axios.$post('/api/report', {
          object: `player_${type}`,
          targetId: this.reportTargetObject.id,
          reason: this.reportReason
        });

        this.reportTargetObject = null;
        this.isReportSaved = true;
      } catch (err) {
        alert('Sorry, looks like we’re having some issues :( Please try again.');
      } finally {
        this.reportReason = null;
      }
    },

    closeModal() {
      if (this.$route.name.indexOf('index-player') !== -1) {
        this.$router.push(this.localePath('index'));
      } else if (this.$route.name.indexOf('comment-player') !== -1) {
        this.$router.push(this.localePath('comment'));
      } else if (this.$route.name.indexOf('search') !== -1) {
        this.$router.push(this.localePath({
          name: 'search-searchData',
          params: {
            searchData: this.$route.params.searchData ? this.$route.params.searchData : null
          }
        }));
      }
    },



    // FOR FAKE COMMENTS
    async addFakeComment() {
      try {
        this.isCommentAdding = true;
        const addedComment = await this.$axios.$post('/api/comments/player/fake', {
          fakeUsername: this.fakeUsername,
          playerId: this.playerId,
          content: this.fakeCommentContent
        });
        this.insertNewComment(addedComment);
        this.fakeUsername = '';
        this.fakeCommentContent = '';
        this.isCommentAdding = false;
        this.player.comment_count ++;
      } catch (err) {
        console.error(err);
      } finally {
        this.isCommentAdding = false;
      }
    },

    async requestFakeVotePlayerOpinion(opinion, vote) {
      await this.$axios.$post('/api/vote/opinion/fake', {
        targetOpinion: opinion.parent_comment_id ? 'player_reply' : 'player_comment',
        targetOpinionId: opinion.id,
        vote
      });

      opinion[`vote_${vote}_count`] ++;
    }
  },

  beforeCreate() {
    if (process.client)
      document.body.style.overflow = 'hidden';
  },

  beforeDestroy() {
    if (process.client)
      document.body.style.overflow = 'unset';
  }
};