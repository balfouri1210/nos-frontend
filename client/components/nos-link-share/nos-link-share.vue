<template>
  <div>
    <button
      v-if="isBasedOnMobileDevice"
      v-clipboard:copy="shareUrl"
      v-clipboard:success="copySuccess"
      class="nos-link-share"
      :style="{
        fontSize: `${fontSize}px`
      }"
    >
      <v-icon
        :style="{
          fontSize: `${fontSize + 2}px`
        }"
      >
        mdi-share-variant
      </v-icon>
      <span>Share</span>
    </button>

    <button
      v-else
      v-clipboard:copy="shareUrl"
      v-clipboard:success="copySuccess"
      class="nos-link-share"
      :style="{
        fontSize: `${fontSize}px`
      }"
    >
      <v-icon
        v-if="!isShareUrlCopied"
        :style="{
          fontSize: `${fontSize + 2}px`
        }"
      >
        mdi-link-variant
      </v-icon>
      <span v-if="!isShareUrlCopied">Copy Link</span>
      <span
        v-else
        style="color: #f4991e"
      >Copied!</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    shareUrl: {
      type: String,
      default: ''
    },

    fontSize: {
      type: Number,
      default: 12
    }
  },

  data() {
    return {
      isShareUrlCopied: false,
      isBasedOnMobileDevice: false
    };
  },

  created() {
    if (process.client)
      this.isBasedOnMobileDevice = /Android|iPhone|iPad/i.test(navigator.userAgent);
  },

  methods: {
    copySuccess() {
      this.isShareUrlCopied = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.nos-link-share {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.7);

  .v-icon {
    margin-right: 4px;
    color: rgba(0, 0, 0, 0.7);
  }
}

@media screen and (min-width: $mobile-width) {
  .nos-link-share {
  }
}
</style>