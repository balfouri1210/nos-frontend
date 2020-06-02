<template>
  <div>
    <nos-player-modal
      :player="player"
      :initial-comments="comments"
    />
  </div>
</template>

<script>
import Base from '@/page-resources/player/playerName/_base';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  mixins: [Base]
};
</script>

<style>
</style>
