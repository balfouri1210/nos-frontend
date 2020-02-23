<template>
  <div />
</template>

<script>
export default {
  transition: 'fade',
  props: {
    error: {
      type: Object,
      default: null
    }
  },

  created() {
    if (this.error.statusCode === 404) {
      this.$router.replace(this.localePath('page-not-found'));
    } else if (this.error.statusCode === 500) {
      this.$router.replace(this.localePath('bugs'));
    }
  }
};
</script>
