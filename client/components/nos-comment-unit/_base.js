import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  props: {
    initialSortType: {
      type: String,
      default: 'date'
    },

    sortTypeSelector: {
      type: Boolean,
      default: false
    },

    moreLink: {
      type: Boolean,
      default: false
    },

    commentsPerRequest: {
      type: Number,
      default: 5
    },

    pagination: {
      type: Boolean,
      default: false
    },

    totalCommentsCount: {
      type: Number,
      default: 0
    },

    historyId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      sortType: null, // sortType은 date, vote 두가지 존재
      comments: [],
      isCommentLoading: false,

      currentPage: 1,
      currentPageGroup: 1, // 1~7, 8~14를 결정하는 변수
      pagesPerLoad: 7, // 한번에 몇개의 페이지를 로드할건지 결정하는 변수
      currentPageIsChanging: false
    };
  },

  computed: {
    routeName() {
      if (this.$route.name.indexOf('comment-history') !== -1) {
        // comment-history 페이지에서 클릭
        return 'comment-history-historyId-player-playerId-playerName';
      } else if (this.$route.name.indexOf('history') !== -1) {
        // history 페이지에서 클릭
        return 'history-historyId-player-playerId-playerName';
      } else if (this.$route.name.indexOf('comment') !== -1) {
        // 실시간 comment 페이지에서 클릭
        return 'comment-player-playerId-playerName';
      } else {
        // 일반 페이지에서 클릭 (랜딩 등)
        return 'index-player-playerId-playerName';
      }
    },

    totalPages() {
      return Math.ceil(this.totalCommentsCount / this.commentsPerRequest);
    },

    calculatedPage() {
      return (index) => {
        return index + (this.pagesPerLoad * (this.currentPageGroup - 1));
      };
    },

    pageIndexRange() {
      if (this.isLastBigPage) {
        const result = this.totalPages % this.pagesPerLoad === 0 ? 7 : this.totalPages % this.pagesPerLoad;
        return result;
      } else if (this.pagesPerLoad < this.totalPages) {
        return this.pagesPerLoad;
      } else {
        return this.totalPages;
      }
    },

    isLastBigPage() {
      return this.currentPageGroup === Math.ceil(this.totalPages / this.pagesPerLoad);
    }
  },


  created() {
    this.sortType = this.initialSortType;
    this.getComments(this.initialSortType);
  },


  methods: {
    ...mapGetters(['getJwt']),

    async getComments() {
      try {
        this.isCommentLoading = true;

        const getCommentsParam = {
          sortType: this.sortType,
          commentsPerRequest: this.commentsPerRequest,
          historyId: this.historyId,
          page: this.currentPage || 1
        };
        const getCommentsUrl = this.historyId ? `/api/histories/${this.historyId}/player/comments` : '/api/comments/player';


        this.comments = await this.$axios.$get(getCommentsUrl, {
          params: getCommentsParam
        });
      } catch (err) {
        console.error(err);
        this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isCommentLoading = false;
      }
    },

    initiateComments() {
      this.comments = [];
    },

    changeSortType(selectedSortType) {
      if (this.sortType !== selectedSortType) {
        this.initiateComments();
        this.sortType = selectedSortType;
        this.getComments(selectedSortType);
      }
    },


    selectPage(page) {
      this.currentPage = page;
    },

    movePage(direction) {
      if (direction === 'prev') { // move to prev
        if (this.currentPage === 1) {
          return;
        } else if (this.currentPage % this.pagesPerLoad === 1) {
          this.currentPage --;
          this.currentPageGroup --;
        } else {
          this.currentPage --;
        }
      } else { // move to next
        if (this.currentPage === this.totalPages) {
          return;
        } else if (this.currentPage % this.pagesPerLoad === 0) { 
          this.currentPage ++;
          this.currentPageGroup ++;
        } else {
          this.currentPage ++;
        }
      }
    },

    changecurrentPageGroup(direction) {
      if (direction === 'prev') {
        if (this.currentPageGroup === 1) return;
        this.currentPageGroup --;
        this.currentPage = (this.pagesPerLoad * (this.currentPageGroup - 1)) + 1;
      } else {
        if (this.isLastBigPage) return;
        this.currentPageGroup ++;
        this.currentPage = (this.pagesPerLoad * (this.currentPageGroup - 1)) + 1;
      }
    }
  },

  watch: {
    async currentPage() {
      this.currentPageIsChanging = true;
      await this.getComments();
      this.currentPageIsChanging = false;
      this.$emit('newCommentsLoaded');
    }
  }
};