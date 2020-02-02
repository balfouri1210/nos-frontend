import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');
import { VERIFICATION_CODE_EXPIRES } from '@/lib/constants';

export default {
  props: {
    email: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      verificationCode: null,
      isVerificationCodeSending: false,
      isVerificationCodeExpired: false,
      expirationTime: VERIFICATION_CODE_EXPIRES
    };
  },

  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading;
    }
  },

  methods: {
    ...mapGetters(['getEmail']),

    async reSendVerificationCode() {
      this.isVerificationCodeSending = true;
      
      try {
        await this.$axios.$post('/api/users/signup-email',
          { email: this.email }
        );

        this.isVerificationCodeSending = false;
        this.isVerificationCodeExpired = false;
      } catch (err) {
        console.error(err);
      }
    },

    async verifyCode() {
      try {
        await this.$axios.$put('/api/auth/account-activation', {
          verificationCode: this.verificationCode
        });
        this.$emit('verified');
      } catch (err) {
        this.$emit('verifyFailed');
      }
    }
  }
};