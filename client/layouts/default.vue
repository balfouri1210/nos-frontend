<template>
  <div>
    <nos-header />
    <nuxt />
    <nos-footer />
  </div>
</template>

<script>
import nosHeader from '@/components/nos-header/nos-header.vue';
import nosFooter from '@/components/nos-footer/nos-footer.vue';

export default {
  components: {
    nosHeader,
    nosFooter
  }
};
</script>