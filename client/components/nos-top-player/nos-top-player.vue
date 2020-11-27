<template>
  <button
    class="nos-top-player"
    @click="selectPlayer(topPlayer)"
  >
    <div class="nos-top-player__header">
      <div style="display: flex; align-items: center">
        <span class="nos-top-player__comment-count">
          <v-icon>mdi-message-processing-outline</v-icon>
          {{ topPlayer.comment_count }}
        </span>

        <span
          v-if="withIn12Hours(topPlayer)"
          class="nos-top-player__new-comment"
        >NEW</span>
      </div>

      <span class="nos-top-player__temperature"><v-icon>mdi-fire</v-icon>907</span>
    </div>

    <div class="nos-top-player__body">
      <div class="only-small-screen">
        <p class="nos-top-player__title">
          <v-icon>mdi-octagram</v-icon>
          Player with the most attention this week
        </p>
      </div>

      <div class="nos-top-player__left">
        <img
          :src="topPlayer.club_image"
          alt="club emblem"
          class="nos-top-player__emblem"
        >

        <div>
          <div class="from-medium-screen">
            <p class="nos-top-player__title">
              <v-icon>mdi-octagram</v-icon>
              Player with the most attention this week
            </p>
          </div>

          <h2 class="nos-top-player__name">
            {{ topPlayer.known_as }}
          </h2>

          <p class="nos-top-player__meta">
            {{ $moment().diff($moment.unix(topPlayer.birthday).format('YYYY-MM-DD'), 'years') }}, {{ topPlayer.height }} cm, <span>{{ topPlayer.country_name }}</span>
            <img
              :src="`${nosImageUrl}/flags/${topPlayer.country_code.toLowerCase()}.png`"
              :alt="topPlayer.country_code"
            >
          </p>
        </div>
      </div>

      <div class="nos-top-player__right">
        <transition name="fade">
          <div
            v-if="topPlayerCommentsPreview.length > 0"
            class="nos-top-player__comments-preview"
          >
            <ul>
              <li
                v-for="(comment, index) in topPlayerCommentsPreview"
                :key="index"
              >
                <p>" {{ comment.content }} "</p>
              </li>
            </ul>

            <span class="nos-top-player__show-more">Show more</span>
          </div>

          <div v-else>
            <p style="color: rgba(0, 0, 0, 0.5); font-weight: 300">
              ... No comments yet
            </p>
          </div>
        </transition>
      </div>
    </div>
  </button>
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