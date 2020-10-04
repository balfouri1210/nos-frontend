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
      // router.push 대신 router.replace를 썼다
      this.$router.replace(this.localePath('page-not-found'));
    } else {
      this.$router.push(this.localePath('bugs'));
    }
  }
};
</script>
