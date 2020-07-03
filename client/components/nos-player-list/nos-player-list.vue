<template>
  <div id="player-list-wrapper">
    <ul
      class="player-list"
    >
      <li
        v-for="(player, index) in playerList"
        :key="index"
        class="player"
        :class="{'player--without-image': player.image_url === 'n'}"
      >
        <button @click="selectPlayer(player)">
          <div class="player__header">
            <div class="player__header-content">
              <div class="player__hits-and-comment">
                <p>
                  <v-icon>mdi-message-processing-outline</v-icon>
                  <span>{{ player.comment_count | thousandSeparator }}</span>
                </p>

                <p>
                  <v-icon>mdi-eye-outline</v-icon>
                  <span>{{ player.hits | thousandSeparator }}</span>
                </p>
              </div>

              <p
                v-if="degreeCalculator(player.score) > 0"
                class="player__temperature"
                :class="{
                  'player--degrees-over-0': degreeCalculator(player.score) >= 0 && degreeCalculator(player.score) < 100,
                  'player--degrees-over-100': degreeCalculator(player.score) >= 100 && degreeCalculator(player.score) < 300,
                  'player--degrees-over-200': degreeCalculator(player.score) >= 300 && degreeCalculator(player.score) < 500,
                  'player--degrees-over-400': degreeCalculator(player.score) >= 500 && degreeCalculator(player.score) < 700,
                  'player--degrees-over-600': degreeCalculator(player.score) >= 700 && degreeCalculator(player.score) < 900,
                  'player--degrees-over-800': degreeCalculator(player.score) >= 900
                }"
              >
                <v-icon>mdi-fire</v-icon>
                <span>{{ degreeCalculator(player.score) }}</span>
              </p>
            </div>

            <client-only>
              <p
                v-if="withIn12Hours(player)"
                class="player__new-comment"
              >
                <span
                  class="nos-neon"
                  style="font-weight: 400"
                  :data-text="innerWidth > 865 ? 'NEW COMMENT' : 'NEW'"
                >NEW <span v-if="innerWidth > 865">COMMENT</span></span>
              </p>
            </client-only>
          </div>

          <div
            v-if="player.image_url === 'y'"
            class="player__image"
            :style="{
              backgroundImage: `url(${nosImageUrl}/players/${player.id}.jpg), url(${nosImageUrl}/players/default2.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }"
          />

          <img
            v-if="player.image_url === 'n'"
            :class="{'centered': player.image_url === 'n'}"
            class="player__meta-club"
            :src="player.club_image"
            alt="club"
          >

          <div
            class="player__meta"
            :style="{
              height: playerMetaHeight(player)
            }"
          >
            <div>
              <div class="player__meta-comments-preview">
                <transition name="fade">
                  <ul v-if="player.commentsPreview">
                    <li
                      v-for="(comment, commentIndex) in player.commentsPreview"
                      :key="commentIndex"
                    >
                      <p>"{{ comment.content }}"</p>
                    </li>
                  </ul>
                </transition>
              </div>

              <p class="player__meta-known-as">
                <img
                  class="player__meta-flag"
                  :src="`${nosImageUrl}/flags/${player.country_code.toLowerCase()}.png`"
                  :alt="player.country_code"
                >
                {{ player.known_as }}
              </p>

              <p
                v-if="needPlayerMeta"
                class="player__meta-birth-height"
              >
                <span>{{ $moment.unix(player.birthday).format('YYYY. MM. DD') }}</span>
                <span v-if="player.height > 0"> / {{ player.height }}cm</span>
              </p>
            </div>
          </div>
        </button>
      </li>
    </ul>

    <div
      v-if="isMorePlayersLoading"
      class="player-list__loader"
    >
      <v-progress-circular
        :size="26"
        :width="3"
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
@import "./_style.scss";
</style>