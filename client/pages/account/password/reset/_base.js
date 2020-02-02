export default {
  layout: 'entry',
  
  data() {
    return {
      email: null,

      isResetPwdEmailSending: false,
      isResetPwdEmailSendCompleted: false,
      isResetPwdEmailSendFailed: false,
    };
  },

  methods: {
    async onSubmit() {
      try {
        this.isResetPwdEmailSending = true;
        await this.$axios.$post('/api/users/email/password-reset', {
          email: this.email
        });
        this.isResetPwdEmailSendCompleted = true;
      } catch (err) {
        if (err.response.data.status === 400) {
          this.isResetPwdEmailSendFailed = true;
        }
      } finally {
        this.isResetPwdEmailSending = false;
      }
    }
  }
};