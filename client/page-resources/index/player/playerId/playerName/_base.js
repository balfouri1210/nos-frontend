import nosPlayerModal from '@/components/nos-player-modal/nos-player-modal.vue';

export default {
  components: {
    nosPlayerModal
  },

  async asyncData({ $axios, error, params }) {
    function getPlayer() {
      return $axios.$get(`/api/players/${params.playerId}`);
    }

    function getComments() {
      return $axios.$get(`/api/comments/player/${params.playerId}`, {
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

      return { player, comments };
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