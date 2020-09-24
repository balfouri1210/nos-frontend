import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('auth');

export default {
  data() {
    return {
      isLoginModal: false,
      isAccountMenuModal: false,
      isNotificationModal: false,
      isSearchModal: false
    };
  },

  computed: {
    isLoggedIn() {
      return this.getJwt();
    }
  },

  mounted() {
    this.updateUnreadNotificationCount();
  },

  methods: {
    ...mapGetters(['getJwt', 'getId', 'getUnreadNotificationCount']),
    ...mapActions(['mutateUnreadNotificationCountAction']),

    goToHome() {
      if (this.$route.name.indexOf('index') !== -1) {
        window.location.reload();
      } else {
        this.$router.push(this.localePath('index'));
      }
    },

    async updateUnreadNotificationCount() {
      try {
        if (this.getJwt()) {
          await this.mutateUnreadNotificationCountAction();
        }
      } catch (err) {
        console.error(err);
      }
    },

    loginSuccessHandler() {
      this.updateUnreadNotificationCount();
      this.isLoginModal = false;
    },

    logoutSuccessHandler() {
      this.isAccountMenuModal = false;
    },

    closeNotificationModal() {
      this.isNotificationModal = false;
    },

    clickOutsideHandler() {
      this.isLoginModal = false;
      this.isAccountMenuModal = false;
      this.isNotificationModal = false;
      this.isSearchModal = false;
    }
  }
};
