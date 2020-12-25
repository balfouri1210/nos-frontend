<template>
  <!-- client-only인 이유 : screen size를 감지하여 (isMobile)
  렌더링할 컴포넌트를 결정하는데 이는 serverside에서 불가능하기 때문.  -->
  <client-only>
    <mobile-comp v-if="isMobile" />
    <desktop-comp v-else />
  </client-only>
</template>

<script>
import mobileComp from './_mobile.vue';
import desktopComp from './_desktop.vue';

export default {
  components: {
    mobileComp,
    desktopComp
  },

  computed: {
    isMobile() {
      const innerWidth = process.client ? window.innerWidth : 0;
      return innerWidth < 865;
    }
  }
};
</script>
