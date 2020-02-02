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
        name: 'Lionel Messii',
        team: 'FC Barcelona',
        imgSrc: '/messi.png'
      }, {
        id: 2,
        name: 'Paulo Dybala',
        team: 'FC Juventus',
        imgSrc: '/dybala.jpg'
      }, {
        id: 3,
        name: 'Marco Reus',
        team: 'Borussia Dortmund',
        imgSrc: '/reus.png'
      }, {
        id: 4,
        name: 'Kangin Lee',
        team: 'FC Valencia',
        imgSrc: '/kangin.png'
      }]
    };
  },

  methods: {
    ...mapGetters(['getJwt', 'getUsername'])
  }
};