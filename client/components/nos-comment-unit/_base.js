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
      if (this.$route.name.indexOf('comment') !== -1) {
        return 'comment-player-playerId-playerName';
      } else {
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

  mounted() {
    console.log(`total pages : ${this.totalPages}`);
    console.log(`page index range : ${this.pageIndexRange}`);
  },

  methods: {
    ...mapGetters(['getJwt']),

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

    async getComments(sortType, page) {
      try {
        this.isCommentLoading = true;

        this.comments = await this.$axios.$get('/api/comments/player', {
          params: {
            sortType,
            commentsPerRequest: this.commentsPerRequest,
            page: page || 1
          }
        });
      } catch (err) {
        this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isCommentLoading = false;
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
      await this.getComments(this.sortType, this.currentPage);
      this.currentPageIsChanging = false;
      this.$emit('newCommentsLoaded');
    }
  }
};