<template>
  <div>
    <nos-player-modal
      :player="player"
      :initial-comments="comments"
    />
  </div>
</template>

<script>
import Base from '@/page-resources/search/player/playerId/playerName/_base';

export default {
  mixins: [Base],

  head() {
    return {
      title: `Search - ${this.$route.params.playerName.replace(/-/g, ' ')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Weekly news and thoughts about ${this.$route.params.playerName.replace(
            /-/g,
            ' '
          )}.`
        }
      ]
    };
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  }
};
</script>

<style>
</style>
