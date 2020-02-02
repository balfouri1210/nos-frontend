export default {
  async asyncData({ $axios, route }) {
    let verificationResult;
    try {
      await $axios.$post('/api/auth/account-verification', {
        verificationCode: route.query.vc
      });
      verificationResult = true;
    } catch (err) {
      verificationResult = false;
    }

    return { verificationResult };
  },

  data() {
    return {
      newPassword: null,
      confirmNewPassword: null,

      isPasswordResetting: false,
      isPasswordResetCompleted: true,
      isPasswordResetFailed: false
    };
  },

  methods: {
    async resetPassword() {
      try {
        this.isPasswordResetting = true;
        this.$axios.$put('/api/auth/password-reset', {
          verificationCode: this.$route.query.vc,
          newPassword: this.newPassword
        });
        this.isPasswordResetCompleted = true;
      } catch (err) {
        this.isPasswordResetFailed = true;
      } finally {
        this.isPasswordResetting = false;
      }
    }
  }
};