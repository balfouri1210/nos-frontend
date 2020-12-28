<template>
  <div>
    <nos-player-modal-history
      :history="history"
      :player-history="playerHistory"
      :comments="comments"
    />
  </div>
</template>

<script>
import nosPlayerModalHistory from '@/components/nos-player-modal-history/nos-player-modal-history.vue';
import nosPlayerModalHistoryMixin from '@/mixins/nos-player-modal-history-mixin';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  components: {
    nosPlayerModalHistory
  },

  mixins: [nosPlayerModalHistoryMixin]
};
</script>

<style>

</style>