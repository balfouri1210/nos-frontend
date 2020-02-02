import countries from '@/lib/country';
import nosUserVerifier from '@/components/nos-user-verifier/nos-user-verifier.vue';

export default {
  components: {
    nosUserVerifier
  },

  data() {
    return {
      errors: [],
      userInfo: {
        email: null,
        password: null,
        username: null,
        countryId: null,
        birth: null,
        gender: null
      },

      confirmPassword: null,
      countries,
      signupFormSubmitting: false,

      signupCompleted: false,
      signupFailed: false
    };
  },

  methods: {
    async onSubmit() {
      this.signupFormSubmitting = true;

      try {
        await this.$axios.$post('/api/users', {
          ...this.userInfo,
          birth: this.$moment(this.userInfo.birth).format('YYYYMMDD')
        });

        this.signupFormSubmitting = false;

        this.$router.push(this.localePath({
          name: 'signup-complete-email',
          params: {
            email: this.userInfo.email
          }
        }));
      } catch (err) {
        this.signupFailed = true;
      } finally {
        this.signupFormSubmitting = false;
      }
    },

    verifiedHandler() {
      this.signupCompleted = true;
    },

    verifyFailedHandler() {
      this.signupFailed = true;
    }
  }
};