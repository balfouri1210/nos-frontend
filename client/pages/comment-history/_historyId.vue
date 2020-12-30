<template>
  <div class="comment">
    <nos-history-period
      :history="history"
      :go-back-word="'History'"
      :go-back-route-name="'history-historyId'"
      :go-back-route-params="{ historyId: history.id }"
    />

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
          Sort by Date
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