import axios from 'axios';

export default {
  data() {
    return {
      email: null,
      password: null
    }
  },

  methods: {
    // async signup() {
    //   try {
    //     const user = await axios.post(
    //       `${process.env.NOS_API_URL}/users`, {
    //         email: this.email,
    //         password: this.password
    //       }
    //     );

    //     console.log(user);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
  }
}