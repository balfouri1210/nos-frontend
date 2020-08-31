export default {
  computed: {
    isMobile() {
      const innerWidth = process.client ? window.innerWidth : 0;
      return innerWidth < 865;
    }
  }
};