<template>
  <div>
    <sg-header />
    <nuxt />
    <sg-footer />
  </div>
</template>

<script>
import sgHeader from '@/components/sg-header/sg-header.vue';
import sgFooter from '@/components/sg-footer/sg-footer.vue';

export default {
  components: {
    sgHeader,
    sgFooter
  }
};
</script>