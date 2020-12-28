import nosPlayerModalHistory from '@/components/nos-player-modal-history/nos-player-modal-history';

export default {
  components: {
    nosPlayerModalHistory
  },

  // Scroll lock
  beforeCreate() {
    if (process.client)
      document.body.style.overflow = 'hidden';
  },

  beforeDestroy() {
    if (process.client)
      document.body.style.overflow = 'unset';
  }
};