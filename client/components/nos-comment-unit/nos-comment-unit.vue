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
        <span>More</span><v-icon>mdi-chevron-right</v-icon>
      </div>
    </div>

    <div class="nos-comment-unit__body">
      <ul>
        <li
          v-for="(comment, index) in comments"
          :key="index"
          class="nos-comment-unit__comment"
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
        </li>
      </ul>
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