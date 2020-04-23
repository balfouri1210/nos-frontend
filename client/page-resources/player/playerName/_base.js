import nosPlayerModal from '@/components/nos-player-modal/nos-player-modal.vue';

export default {
  components: {
    nosPlayerModal
  },

  async asyncData({ store, $axios, error }) {
    const playerId = store.getters['player/getPlayerId'];

    function getPlayer() {
      return $axios.$get(`/api/players/${playerId}`);
    }

    function getComments() {
      return $axios.$get(`/api/comments/player/${playerId}`, {
        params: {
          sortType: 'like'
        }
      });
    }

    try {
      const [player, comments] = await Promise.all([
        getPlayer(),
        getComments()
      ]);

      return { playerId, player, comments };
    } catch (err) {
      console.error(err);
      error({ statusCode: 500 });
    }
  },

  // Body scroll lock
  beforeRouteEnter(to, from, next) {
    if (process.client) document.documentElement.style.overflow = 'hidden';
    next();
  },
  
  // Body scroll release
  beforeRouteLeave(to, from ,next) {
    if (process.client) document.documentElement.style.overflow = 'auto';
    next();
  }
};