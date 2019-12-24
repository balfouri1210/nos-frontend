import axios from 'axios';
import countries from '@/lib/country';

export default {
  data() {
    return {
      errors: [],
      userInfo: {
        email: null,
        password: null,
        confirmPassword: null,
        username: null,
        countryId: null,
        birth: null,
        gender: null
      },
      countries
    };
  },

  methods: {
    async signup() {
      try {
        const user = await axios.post(
          '/api/users', {
            email: this.email,
            password: this.password
          }
        );

        console.log(user);
      } catch (err) {
        console.error(err);
      }
    },

    onSubmit() {
      console.log('Form has been submitted!');
      console.log({
        ...this.userInfo,
        birth: this.$moment(this.userInfo.birth).format('YYYYMMDD')
      });
    }
  }
};