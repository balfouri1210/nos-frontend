<template>
  <div class="nos-comment-unit-wrapper">
    <nos-comment-unit
      :initial-sort-type="'date'"
      :more-link="true"
      :history-id="Number.parseInt($route.params.historyId)"
    >
      <p>
        <v-icon>mdi-octagram</v-icon>
        New Comments
      </p>
    </nos-comment-unit>

    <nos-comment-unit
      :initial-sort-type="'vote'"
      :more-link="true"
      :history-id="Number.parseInt($route.params.historyId)"
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
.nos-comment-unit-wrapper {
  margin: 8px auto;
}

@media screen and (min-width: $mobile-width) {
  .nos-comment-unit-wrapper {
    display: flex;
    justify-content: space-between;
    max-width: $web-body-content-width;
    margin: 16px auto;

    .nos-comment-unit {
      display: flex;
      flex-direction: column;
    }

    .nos-comment-unit:last-of-type {
      margin-left: 16px;
    }
  }
}
</style>