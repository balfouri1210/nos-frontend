<template>
  <div class="nos-comment-unit-desktop-wrapper">
    <nos-comment-unit
      :initial-sort-type="'date'"
      :more-link="true"
    >
      <p>
        <v-icon>mdi-octagram</v-icon>
        New Comments
      </p>
    </nos-comment-unit>

    <nos-comment-unit
      :initial-sort-type="'vote'"
      :more-link="true"
    >
      <p>
        <v-icon>mdi-fire</v-icon>
        Hot Comments
      </p>
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
@media screen and (min-width: $mobile-width) {
  .nos-comment-unit-desktop-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    max-width: $web-body-content-width;
    margin: 0 auto 16px;

    .nos-comment-unit:last-of-type {
      margin-left: 50px;
    }
  }
}
</style>