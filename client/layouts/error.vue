<template>
  <div />
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },

  created() {
    console.log('error called');
    if (this.error.statusCode === 404) {
      console.log('error: 404');
      this.$router.push(this.localePath('page-not-found'));
    } else if (this.error.statusCode === 500) {
      console.log('error: 500');
      this.$router.push(this.localePath('bugs'));
    }
  }
};
</script>
