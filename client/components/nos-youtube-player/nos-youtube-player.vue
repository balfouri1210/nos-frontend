<template>
  <div class="youtube-player">
    <iframe
      id="ytplayer"
      type="text/html"
      width="100%"
      height="240"
      :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=https://907degrees.com`"
      frameborder="0"
      allow="autoplay"
      allowfullscreen="allowfullscreen"
      mozallowfullscreen="mozallowfullscreen" 
      msallowfullscreen="msallowfullscreen" 
      oallowfullscreen="oallowfullscreen" 
      webkitallowfullscreen="webkitallowfullscreen"
    />

    <button
      v-if="isBasedOnMobileDevice"
      class="youtube-player__view-on-app-btn"
      @click="viewOnYoutubeApp"
    >
      <img
        src="logos/youtube.png"
        alt="youtube"
      >
    </button>

    <button
      class="youtube-player__close-btn"
      @click="closeYoutubeVideo"
    >
      <v-icon>mdi-close</v-icon>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    videoId: {
      type: String,
      default: null
    }
  },

  computed: {
    isBasedOnMobileDevice() {
      return /Android|iPhone|iPad/i.test(navigator.userAgent);
    }
  },

  methods: {
    closeYoutubeVideo() {
      this.$emit('closeYoutubeVideo');
    },

    viewOnYoutubeApp() {
      const desktopFallback = `https://youtube.com/watch?v=${this.videoId}`;
      const mobileFallback = `https://youtube.com/watch?v=${this.videoId}`;
      const app = `vnd.youtube://${this.videoId}`;

      if (this.isBasedOnMobileDevice) {
        window.location = app;
        window.setTimeout(function() {
          window.location = mobileFallback;
        }, 1000);
      } else {
        window.location = desktopFallback;
      }

      function killPopup() {
        window.removeEventListener('pagehide', killPopup);
      }

      window.addEventListener('pagehide', killPopup);
    }
  }
};
</script>

<style lang="scss" scoped>
.youtube-player {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  padding-bottom: 56%;
  z-index: 100;
  background: black;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__view-on-app-btn,
  &__close-btn {
    position: absolute;
    bottom: -37px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: black;
    padding: 4px 8px;
    width: 38px;
    height: 38px;

    .v-icon {
      color: white;
    }
  }

  &__view-on-app-btn {
    right: 40px;

    img {
      width: 20px;
    }
  }

  &__close-btn {
    right: 0;
  }
}

@media screen and (min-width: $mobile-width) {
  // .youtube-player {
  //   &__view-on-app-btn {
  //     display: none;
  //   }
  // }
}
</style>