<template>
  <div>
    <mobile-nos-comment-unit v-if="isMobile" />
    <desktop-nos-comment-unit v-else />
  </div>
</template>

<script>
import mobileNosCommentUnit from './_mobile.vue';
import desktopNosCommentUnit from './_desktop.vue';

export default {
  components: {
    mobileNosCommentUnit,
    desktopNosCommentUnit
  },

  computed: {
    isMobile() {
      const innerWidth = process.client ? window.innerWidth : 0;
      return innerWidth < 865;
    }
  }
};
</script>
