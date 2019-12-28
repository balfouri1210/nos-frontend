<template>
  <header class="nos-header">
    <div>
      <nuxt-link
        :to="localePath('index')"
      >
        GO TO HOME!
      </nuxt-link>
    </div>

    <div>
      <button @click="isLoginModal = !isLoginModal">
        Login
      </button>
    </div>

    <nos-login-modal
      v-if="isLoginModal"
    />
  </header>
</template>

<script>
import nosLoginModal from '@/components/nos-login-modal/nos-login-modal.vue';

export default {
  components: {
    nosLoginModal
  },

  data() {
    return {
      isLoginModal: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>