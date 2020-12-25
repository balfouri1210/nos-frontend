<template>
  <div class="nos-comment-unit-wrapper">
    <nos-comment-unit
      :more-link="true"
      :sort-type-selector="true"
    >
      <p>Comments</p>
    </nos-comment-unit>
  </div>
</template>

<script>
import nosCommentUnit from '@/components/nos-comment-unit/nos-comment-unit.vue';

export default {
  components: {
    nosCommentUnit
  }
};
</script>

<style lang="scss" scoped>
.nos-comment-unit-wrapper {
  max-width: $web-body-content-width;
  margin: 8px auto;
}

@media screen and (min-width: $mobile-width) {
  .nos-comment-unit-wrapper {
    margin: 12px auto;
  }
}
</style>