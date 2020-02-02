export default {
  data() {
    return {
      signupEmailResending: false
    };
  },

  methods: {
    async sendVerificationMailAgain() {
      try {
        this.signupEmailResending = true;
        await this.$axios.$post('/api/users/email/signup',
          { email: this.$route.params.email }
        );
        alert('Verification email sent!');
      } catch (err) {
        alert('Sorry, fail to send verification email. Please try arter few minutes.');
      } finally {
        this.signupEmailResending = false;
      }
    }
  }
};
