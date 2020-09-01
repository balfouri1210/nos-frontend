<template>
  <div class="nos-comment-unit-desktop-wrapper">
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
.nos-comment-unit-desktop-wrapper {
  max-width: $web-body-content-width;
  margin: 0 auto 16px;
}
</style>