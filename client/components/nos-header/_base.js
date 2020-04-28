import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('auth');
import vClickOutside from 'v-click-outside';

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },

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

  created() {
    this.updateUnreadNotificationCount();
  },

  methods: {
    ...mapGetters(['getJwt', 'getId', 'getUnreadNotificationCount']),
    ...mapActions(['mutateUnreadNotificationCountAction']),

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
      console.log('fuck');
      this.isLoginModal = false;
      this.isAccountMenuModal = false;
      this.isNotificationModal = false;
      this.isSearchModal = false;
    }
  }
};
