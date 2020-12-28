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

  mixins: [nosPlayerModalHistoryMixin],

  head() {
    return {
      title: `907Degrees - history: ${this.$route.params.playerName.replace(
        /-/g,
        ' '
      )}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Check out what fans thought about ${this.$route.params.playerName.replace(
            /-/g,
            ' '
          )} this week`
        },

        // Opengraph
        {
          property: 'og:title',
          content: `907Degrees - history: ${this.$route.params.playerName.replace(
            /-/g,
            ' '
          )}`
        },
        {
          property: 'og:site_name',
          content: '907Degrees - history'
        },
        {
          property: 'og:url',
          content: `${process.env.NOS_URL}${this.$route.fullPath}`
        },
        {
          property: 'og:image',
          content: 'https://907degrees.com/opengraph.png'
        }
      ]
    };
  }
};
</script>