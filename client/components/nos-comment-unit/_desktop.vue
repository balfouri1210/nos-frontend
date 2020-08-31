<template />

<script>
export default {
  data() {
    return {
      hotComments: null,
      newComments: null
    };
  },

  created() {
    this.getComments(this.sortType);
  },

  methods: {
    async getComments() {
      try {
        [this.hotComments, this.newComments] = await Promise.all([
          this.$axios.$get('/api/comments/player', {
            params: {
              sortType: 'vote'
            }
          }),

          this.$axios.$get('/api/comments/player', {
            params: {
              sortType: 'date'
            }
          }),
        ]);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>