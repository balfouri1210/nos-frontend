import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  // async asyncData({ $axios }) {
  //   try {
  //     const result = (await $axios.$get('/api/users')) || null;
  //     return { result };
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },

  data() {
    return {
      stage: process.env.STAGE,

      players: [{
        name: 'Lionel Messi',
        team: 'FC Barcelona'
      }, {
        name: 'Kangin Lee',
        team: 'FC Valencia'
      }]
    };
  },

  methods: {
    ...mapGetters(['getJwt', 'getEmail'])
  }
};