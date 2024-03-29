<template>
  <div class="nos-comment-unit">
    <div class="nos-comment-unit__header">
      <div style="display: flex">
        <div class="nos-comment-unit__header-title">
          <slot />
        </div>

        <div
          v-if="sortTypeSelector"
          class="nos-comment-unit__sort-type"
        >
          <button
            class="nos-comment-unit__sort-type-btn"
            :class="{'nos-comment-unit__sort-type-btn--active': sortType === 'date'}"
            @click="changeSortType('date')"
          >
            <v-icon>mdi-octagram</v-icon>
            <span>New</span>
          </button>

          <button
            class="nos-comment-unit__sort-type-btn"
            :class="{'nos-comment-unit__sort-type-btn--active': sortType === 'vote'}"
            @click="changeSortType('vote')"
          >
            <v-icon>mdi-fire</v-icon>
            <span>Hot</span>
          </button>
        </div>
      </div>

      <div
        v-if="moreLink"
        class="nos-comment-unit__more"
      >
        <nuxt-link
          :to="localePath({
            name: $route.params.historyId ? 'comment-history-historyId' : 'comment',
            params: {
              historyId: $route.params.historyId
            }
          })"
        >
          <span>More</span><v-icon>mdi-chevron-right</v-icon>
        </nuxt-link>
      </div>
    </div>

    <div class="nos-comment-unit__body">
      <div
        v-if="comments.length === 0"
        class="nos-comment-unit__empty centered"
      >
        <v-progress-circular
          v-if="isCommentLoading"
          :size="20"
          :width="2"
          color="#808080"
          indeterminate
        />

        <div v-else>
          <v-icon>mdi-message-processing-outline</v-icon>
          <p>No comments yet</p>
        </div>
      </div>

      <ul
        v-else
        :class="{ 'nos-comment-unit--changing': currentPageIsChanging }"
      >
        <li
          v-for="(comment, index) in comments"
          :key="index"
          class="nos-comment-unit__comment"
          :class="{'nos-comment-unit__real-comment': comment.user_id !== 3 && $store.getters['auth/getAuthorization'] === 3}"
        >
          <nuxt-link
            :to="localePath({
              name: routeName,
              params: {
                historyId: $route.params.historyId,
                playerId: comment.player_id,
                playerName: comment.player_name.toLowerCase().replace(/ /g, '-')
              }
            })"
          >
            <div class="nos-comment-unit__meta">
              <div>
                <img
                  :src="comment.club_image"
                  alt="club emblem"
                >
                <span>{{ comment.player_name }}</span>
                <span class="nos-comment-unit__created-at">{{ $moment(comment.created_at).fromNow() }}</span>
              </div>

              <div>
                <span class="nos-comment-unit__statistics">
                  <v-icon>mdi-thumb-up</v-icon>
                  {{ comment.vote_up_count }}
                </span>
              </div>
            </div>

            <p class="nos-comment-unit__content">
              {{ comment.content }}
            </p>
          </nuxt-link>
        </li>
      </ul>
    </div>

    <!-- PAGINATION -->
    <div
      v-show="pagination && comments.length > 0"
      class="nos-comment-unit__pagination-wrapper"
    >
      <div
        v-if="totalPages > pagesPerLoad"
        class="nos-comment-unit__page-navigation"
      >
        <button
          v-if="currentPage > 7"
          style="margin-right: 36px"
          @click="changecurrentPageGroup('prev')"
        >
          <v-icon>mdi-chevron-double-left</v-icon>
          <span>Prev 7 pages</span>
        </button>

        <button
          v-if="!isLastBigPage"
          @click="changecurrentPageGroup('next')"
        >
          <span>Next 7 pages</span>
          <v-icon>mdi-chevron-double-right</v-icon>
        </button>
      </div>

      <div class="nos-comment-unit__pagination">
        <button
          v-if="currentPage !== 1"
          style="margin-right: 12px"
          @click="movePage('prev')"
        >
          <v-icon>mdi-chevron-left</v-icon>
          <span>Prev</span>
        </button>

        <ul>
          <li
            v-for="index in pageIndexRange"
            :key="index"
          >
            <button
              class="nos-comment-unit__page"
              :class="{'nos-comment-unit__page--active': currentPage === calculatedPage(index) }"
              @click="selectPage(calculatedPage(index))"
            >
              {{ calculatedPage(index) }}
            </button>
          </li>
        </ul>

        <button
          v-if="totalPages !== currentPage"
          style="margin-left: 12px"
          @click="movePage('next')"
        >
          <span>Next</span>
          <v-icon>mdi-chevron-right</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Base from './_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>