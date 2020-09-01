<template>
  <!-- client-only인 이유 : screen size를 감지하여 (isMobile)
  렌더링할 컴포넌트를 결정하는데 이는 serverside에서 불가능하기 때문.  -->
  <client-only>
    <mobile-nos-comment-unit v-if="isMobile" />
    <desktop-nos-comment-unit v-else />
  </client-only>
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
