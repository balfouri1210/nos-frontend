export default {
  layout: 'entry',

  async asyncData({ $axios, route }) {
    let isAccountActivated,
      isAccountAlreadyActivated,
      isAccountActivationFailed,
      activationFinished;

    try {
      await $axios.$put('/api/auth/account-activation', {
        verificationCode: route.params.verificationCode
      });

      isAccountActivated = true;
    } catch (err) {
      switch (err.response.data.code) {
      case 'u010':
        isAccountAlreadyActivated = true;
        break;

      case 'u003':
        isAccountActivationFailed = true;
        break;
      }
    } finally {
      activationFinished = true;
    }

    return {
      isAccountActivated,
      isAccountAlreadyActivated,
      isAccountActivationFailed,
      activationFinished
    };
  },

  mounted() {
    if (this.isAccountActivated) {
      gtag('event', 'account-activation', {
        event_category: 'account'
      });
    } else if (this.isAccountAlreadyActivated) {
      gtag('event', 'account-already-activation', {
        event_category: 'account'
      });
    } else if (this.isAccountActivationFailed) {
      gtag('event', 'account-activation-fail', {
        event_category: 'account'
      });
    }
  }
};
