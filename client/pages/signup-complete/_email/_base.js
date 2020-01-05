export default {
  methods: {
    async sendVerificationMailAgain() {
      try {
        await this.$axios.post('/api/users/signup-email',
          { email: this.$route.params.email }
        );
      } catch (err) {
        console.error(err);
      }
    }
  }
};
