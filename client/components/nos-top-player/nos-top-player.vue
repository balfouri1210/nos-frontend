<template>
  <button
    class="top-player"
    @click="selectPlayer(topPlayer)"
  >
    <div class="top-player__div">
      <div class="player__header">
        <div class="player__hits-and-comment">
          <p>
            <v-icon>mdi-eye</v-icon>
            <span>{{ topPlayer.hits | thousandSeparator }}</span>
          </p>

          <p>
            <v-icon>mdi-message-processing-outline</v-icon>
            <span>{{ topPlayer.comment_count | thousandSeparator }}</span>
          </p>
        </div>
      </div>

      <div
        class="top-player__image"
        :style="{
          backgroundImage: `url(${nosImageUrl}/players/${topPlayer.id}.jpg), url(${nosImageUrl}/players/default2.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }"
      >
        <div
          class="player__meta"
          style="height: 25%"
        >
          <p>
            <span>{{ $moment.unix(topPlayer.birthday).format('YYYY. MM. DD') }}</span>
            <span v-if="topPlayer.height > 0"> / {{ topPlayer.height }}cm</span>
          </p>
        </div>
      </div>

      <div class="top-player__meta">
        <div style="width: 100%">
          <div class="top-player__meta-body">
            <img
              :src="`/flags/${topPlayer.country_code.toLowerCase()}.png`"
              :alt="topPlayer.country_code"
            >
            <div class="top-player__profile-wrapper">
              <p class="top-player__known-as">
                {{ topPlayer.known_as }}
              </p>
            </div>
          </div>

          <transition name="fade">
            <div
              v-if="topPlayerCommentsPreview.length > 0"
              class="top-player__comments-preview"
            >
              <ul>
                <li
                  v-for="(comment, index) in topPlayerCommentsPreview"
                  :key="index"
                >
                  <p>"{{ comment.content }}"</p>
                </li>
              </ul>

              <span>Show more</span>
            </div>
          </transition>
        </div>
      </div>
    </div> 

    <img
      src="https://images.907degrees.com/logos/logo.svg"
      alt="logo"
      class="top-player__logo"
    >
  </button>
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