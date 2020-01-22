import countries from '@/lib/country';

export default {
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
      countries
    };
  },

  methods: {
    async onSubmit() {
      try {
        await this.$axios.$post('/api/users', {
          ...this.userInfo,
          birth: this.$moment(this.userInfo.birth).format('YYYYMMDD')
        });

        this.$router.push(this.localePath({
          name: 'signup-complete-email',
          params: {
            email: this.userInfo.email
          }
        }));
      } catch (err) {
        console.error(err.response);
      }
    }
  }
};