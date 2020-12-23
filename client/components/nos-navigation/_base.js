export default {
  methods: {
    selectMenu(menu) {
      if (menu.name === 'logout') {
        this.$store.$logout();
        this.$emit('close');
        this.$router.push(this.localePath('index'));
      } else {
        this.$router.push(this.localePath(menu.routerName));
      }
    }
  }
};