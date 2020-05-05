import { errors } from '@/lib/constants';

export default {
  layout: 'entry',

  async asyncData({ $axios, route }) {
    let isAccountActivated,
      isAccountAlreadyActivated,
      isAccountActivationFailed,
      verificationFinished;

    try {
      await $axios.$put('/api/auth/account-activation', {
        verificationCode: route.params.verificationCode
      });

      isAccountActivated = true;
    } catch (err) {
      switch (err.response.data.code) {
      case errors.ALREADY_ACTIVATED_USER.code:
        isAccountAlreadyActivated = true;
        break;

      case errors.USER_NOT_FOUND.code:
        isAccountActivationFailed = true;
        break;
      }
    } finally {
      verificationFinished = true;
    }

    return {
      isAccountActivated,
      isAccountAlreadyActivated,
      isAccountActivationFailed,
      verificationFinished
    };
  }
};
