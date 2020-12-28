<template>
  <div class="comment">
    <div
      v-if="$route.params.historyId"
      class="comment__history-period flex-basic"
    >
      {{ $moment(historyInfo.start_date).format('YYYY. MM. DD HH:mm') }} ~ {{ $moment(historyInfo.end_date).format('YYYY. MM. DD HH:mm') }}
    </div>

    <div class="comment__content">
      <nos-comment-unit
        :id="'new-comment-unit'"
        :key="newCommentUnitKey"
        :initial-sort-type="'date'"
        :comments-per-request="15"
        :pagination="true"
        :total-comments-count="totalCommentsCount"
        :history-id="Number.parseInt($route.params.historyId)"
        @newCommentsLoaded="$scrollTo('#new-comment-unit', 300, { offset: -70 })"
      >
        <p>
          <v-icon>mdi-octagram</v-icon>
          New Comments
        </p>
      </nos-comment-unit>

      <nos-comment-unit
        :id="'hot-comment-unit'"
        :initial-sort-type="'vote'"
        :comments-per-request="15"
        :pagination="true"
        :total-comments-count="totalHotCommentsCount"
        :history-id="Number.parseInt($route.params.historyId)"
        @newCommentsLoaded="$scrollTo('#hot-comment-unit', 300, { offset: -70 })"
      >
        <p>
          <v-icon>mdi-fire</v-icon>
          Hot Comments
        </p>
      </nos-comment-unit>
    </div>


    <!-- Nuxt child for player modal -->
    <nuxt-child />
  </div>
</template>

<script>
import Base from '@/page-resources/comment-history/_base';

export default {
  layout: 'wide',
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import '@/page-resources/comment/_style.scss';
</style>