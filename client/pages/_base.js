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
        id: 1,
        name: 'lionel messi',
        team: 'FC Barcelona'
      }, {
        id: 7,
        name: 'kangin lee',
        team: 'FC Valencia'
      }]
    };
  },

  methods: {
    ...mapGetters(['getJwt', 'getEmail'])
  }
};