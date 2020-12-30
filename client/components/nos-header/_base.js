import nosLoginModal from '@/components/nos-modals/nos-login-modal/nos-login-modal.vue';
import nosNavigationMobile from '@/components/nos-navigation/mobile.vue';
import nosNavigationDesktop from '@/components/nos-navigation/desktop.vue';
import nosNotificationModal from '@/components/nos-modals/nos-notification-modal/nos-notification-modal.vue';
import nosSearchModal from '@/components/nos-modals/nos-search-modal/nos-search-modal.vue';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('auth');

export default {
  components: {
    nosLoginModal,
    nosNavigationMobile,
    nosNavigationDesktop,
    nosNotificationModal,
    nosSearchModal
  },

  data() {
    return {
      isLoginModal: false,
      isNotificationModal: false,
      isSearchModal: false,

      isNavigationDesktop: false,
      isNavigationMobile: false
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
        this.$emit('reload');
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
      this.isNavigationDesktop = false;
    },

    closeNotificationModal() {
      this.isNotificationModal = false;
    },

    clickOutsideHandler() {
      this.isLoginModal = false;
      this.isNavigationDesktop = false;
      this.isNotificationModal = false;
      this.isSearchModal = false;
    },

    toggleNavigation() {
      if (process.client && window.innerWidth < 865) {
        this.isNavigationMobile = !this.isNavigationMobile;
      } else {
        this.isNavigationDesktop = !this.isNavigationDesktop;
      }
    }
  }
};
