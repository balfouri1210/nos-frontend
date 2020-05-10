import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapMutations } = createNamespacedHelpers('auth');
import nosModalHeader from '../nos-modal-header/nos-modal-header.vue';
import U from '@/lib/util';

export default {
  components: {
    nosModalHeader
  },
  
  data() {
    return {
      notifications: null
    };
  },

  computed: {
    progressCircularColor() {
      const result =
      this.$store.getters.getIsModalWhiteTone(this.$route) ? '#f07c1a' : 'rgb(255, 255, 255)';
      return result;
    }
  },

  created() {
    this.getNotifications();
  },

  methods: {
    ...mapGetters(['getId']),
    ...mapMutations(['mutateUnreadNotificationCount']),

    async getNotifications() {
      try {
        this.notifications = await this.$axios.$get(`/api/notifications/${this.getId()}`);
        this.notifications.forEach((noti) => {
          switch (noti.type) {
          case 'reply':
            noti.text = `${noti.username} add ${noti.type} to your comment: "${noti.content}"`;
            break;
              
          case 'vote_up':
            noti.text = `Your comment got ${noti.content} Likes!`;
          }
        });
        this.mutateUnreadNotificationCount(0);
      } catch (err) {
        console.error(err);
      }
    },

    selectNoti(noti) {
      this.$emit('closeModal');
      this.$store.commit('player/mutatePlayerId', noti.object_id);
      this.$store.commit('player/mutatePlayerName', noti.object_name);
      U.savePlayerInfoToCookie(noti.object_id, noti.object_name);
      this.$router.push(`/player/${noti.object_name}`);
    }
  }
};
