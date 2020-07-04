<template>
  <button
    class="top-player"
    @click="selectPlayer(topPlayer)"
  >
    <div class="top-player__div">
      <div
        class="top-player__image"
        :style="{
          backgroundImage: `url(${nosImageUrl}/players/${topPlayer.id}.jpg), url(${nosImageUrl}/players/default2.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }"
      >
        <div class="top-player__header">
          <div class="top-player__header-content">
            <div class="top-player__hits-and-comment">
              <p>
                <v-icon>mdi-message-processing-outline</v-icon>
                <span>{{ topPlayer.comment_count | thousandSeparator }}</span>
              </p>

              <p>
                <v-icon>mdi-eye-outline</v-icon>
                <span>{{ topPlayer.hits | thousandSeparator }}</span>
              </p>
            </div>

            <p class="top-player__temperature">
              <v-icon>mdi-fire</v-icon>
              <span>Hottest</span>
            </p>
          </div>

          <client-only>
            <p
              v-if="withIn12Hours(topPlayer)"
              class="top-player__new-comment"
            >
              <span
                class="nos-neon"
                style="font-weight: 400"
                :data-text="innerWidth > 865 ? 'NEW COMMENT' : 'NEW'"
              >NEW <span v-if="innerWidth > 865">COMMENT</span></span>
            </p>
          </client-only>
        </div>

        <!-- <div
          class="player__meta"
          style="height: 25%"
        >
          <p>
            <span>{{ $moment.unix(topPlayer.birthday).format('YYYY. MM. DD') }}</span>
            <span v-if="topPlayer.height > 0"> / {{ topPlayer.height }}cm</span>
          </p>
        </div> -->
      </div>

      <div class="top-player__meta">
        <div style="width: 100%">
          <div class="top-player__meta-body">
            <img
              :src="`${nosImageUrl}/flags/${topPlayer.country_code.toLowerCase()}.png`"
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