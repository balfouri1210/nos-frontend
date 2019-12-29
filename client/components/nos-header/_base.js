import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  data() {
    return {
      isLoginModal: false,
      isAccountMenu: false
    };
  },

  methods: {
    ...mapGetters(['getJwt']),

    closeLoginModal() {
      this.isLoginModal = false;
    },

    closeAccountMenuModal() {
      this.isAccountMenu = false;
    }
  },

  computed: {
    isLoggedIn() {
      return this.getJwt();
    }
  }
};
