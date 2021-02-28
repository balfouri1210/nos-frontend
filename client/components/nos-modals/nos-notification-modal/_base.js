import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapMutations } = createNamespacedHelpers('auth');
import nosDefaultModal from '../nos-default-modal/nos-default-modal.vue';

export default {
  components: {
    nosDefaultModal
  },
  
  data() {
    return {
      notifications: null
    };
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
            noti.text = `${noti.username} added reply to your comment: "${noti.content}", ${this.$moment(noti.created_at).fromNow()}`;
            break;

          case 'vote_up':
            noti.text = `${noti.username} likes your comment, ${this.$moment(noti.created_at).fromNow()}`;
          }
        });

        this.mutateUnreadNotificationCount(0);
      } catch (err) {
        console.error(err);
      }
    },

    selectNoti(noti) {
      this.$emit('close-modal');
      this.$router.push(this.localePath({
        name: 'index-player-playerId-playerName',
        params: {
          playerId: noti.object_id,
          playerName: noti.object_name.toLowerCase().replace(/ /g, '-')
        }
      }));
    }
  }
};
