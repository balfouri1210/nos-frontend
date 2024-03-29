import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  methods: {
    ...mapGetters(['getJwt']),

    selectMenu(menu) {
      if (menu.name === 'logout') {
        this.$store.$logout();
        this.$emit('close');
        this.$router.push(this.localePath('index'));
      } else {
        this.$emit('close');
        this.$router.push(this.localePath(menu.routerName));
      }
    }
  }
};