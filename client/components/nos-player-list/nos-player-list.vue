<template>
  <div class="nos-player-list">
    <ul class="nos-player-list__content">
      <li
        v-for="(player, index) in playerList"
        :key="index"
        class="nos-player"
      >
        <button @click="selectPlayer(player)">
          <div class="nos-player__header">
            <div class="nos-player__header-left">
              <span class="nos-player__comment-count">
                <v-icon>mdi-message-processing-outline</v-icon>
                {{ player.comment_count }}
              </span>

              <span
                v-if="withIn12Hours(player)"
                class="nos-player__new-comment"
              >NEW</span>
            </div>

            <span class="nos-player__temperature"><v-icon>mdi-fire</v-icon>{{ degreeCalculator(player.score) }}</span>
          </div>

          <div class="nos-player__body">
            <div>
              <div class="nos-player__upper">
                <img
                  :src="player.club_image"
                  :alt="player.club_name"
                  class="nos-player__emblem"
                >

                <div>
                  <h2 class="nos-player__name">
                    {{ player.known_as }}
                  </h2>

                  <p class="nos-player__meta">
                    {{ $moment.unix(player.birthday).format('DD / MM / YYYY') }}, {{ player.height }} cm,
                    <img
                      :src="`${nosImageUrl}/flags/${player.country_code.toLowerCase()}.png`"
                      :alt="player.country_code"
                    >
                  </p>
                </div>
              </div>

              <div
                v-if="player.commentsPreview"
                class="nos-player__comments-preview"
              >
                <transition name="fade">
                  <ul v-if="player.commentsPreview.length > 0">
                    <li
                      v-for="(comment, commentIndex) in player.commentsPreview"
                      :key="commentIndex"
                    >
                      <p>" {{ comment.content }} "</p>
                    </li>
                  </ul>

                  <div
                    v-else
                    class="nos-player__no-comments"
                  >
                    <p>... No comments yet</p>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <div class="nos-player__footer">
            <span
              class="nos-player__rank"
              style="color: rgba(0, 0, 0, 0.5)"
            >Rank. {{ index + startRank }}</span>
          </div>
        </button>
      </li>
    </ul>

    <div
      v-if="activateLoadMore && totalPlayerCount && !isMorePlayersLoading"
      class="nos-player-list__load-more"
    >
      <button
        :disabled="previousPlayerIdList.length === totalPlayerCount"
        @click="loadMorePlayers"
      >
        <span v-if="previousPlayerIdList.length !== totalPlayerCount">Load More Players, <span>{{ previousPlayerIdList.length }} / {{ totalPlayerCount }}</span></span>
        <span v-else>All players have been loaded</span>
      </button>
    </div>

    <div
      v-if="isMorePlayersLoading"
      class="nos-player-list__loader"
    >
      <v-progress-circular
        :size="26"
        :width="2"
        color="#808080"
        indeterminate
      />
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