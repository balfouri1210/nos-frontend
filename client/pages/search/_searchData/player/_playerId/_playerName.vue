<template>
  <div>
    <nos-player-modal
      :player="player"
      :initial-comments="comments"
    />
  </div>
</template>

<script>
import nosPlayerModalMixin from '@/mixins/nos-player-modal-mixin';
import nosPlayerModal from '@/components/nos-player-modal/nos-player-modal.vue';

export default {
  components: {
    nosPlayerModal
  },

  mixins: [nosPlayerModalMixin],

  head() {
    return {
      title: `907Degrees - ${this.$route.params.playerName.replace(/-/g, ' ')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Weekly news and fans' thoughts about ${this.$route.params.playerName.replace(
            /-/g,
            ' '
          )}.`
        },

        // Opengraph
        {
          property: 'og:title',
          content: `907Degrees - ${this.$route.params.playerName.replace(
            /-/g,
            ' '
          )}`
        },
        {
          property: 'og:site_name',
          content: '907Degrees'
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
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  }
};
</script>

<style>
</style>
