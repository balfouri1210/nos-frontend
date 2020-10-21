<template>
  <div v-if="!isEmpty(metaData) || linkType === 'youtube'">
    <!-- Instagram -->
    <div v-if="linkType === 'instagram'">
      <div
        v-if="expanded"
        class="link-preview__embed"
      >
        <div
          style="width: 100%"
          v-html="metaData.html"
        />
      </div>

      <div
        v-else
        class="link-preview__instagram"
      >
        <div
          class="link-preview__instagram-thumbnail"
          :style="{
            backgroundImage: `url(${metaData.thumbnail_url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }"
        />

        <div class="flex-basic">
          <div class="link-preview__instagram-text">
            <p>This is {{ metaData.author_name }}'s instagram post</p>
            <p>You can preview this post via the expand button</p>
          </div>

          <button
            class="link-preview__instagram-expand-btn"
            @click="renderEmbedLink"
          >
            <img
              class="icon"
              src="/icons/instagram.png"
              style="padding: 1px;"
              alt="instagram"
            >
            <span>Expand<br>Post</span>
          </button>
        </div>
      </div>
    </div>


    <!-- Twitter -->
    <div v-else-if="linkType === 'twitter'">
      <div
        class="link-preview__twitter"
        :class="{ 'link-preview__twitter-expanded': expanded }"
      >
        <div
          v-if="expanded"
          style="width: 100%"
          v-html="metaData.html"
        />

        <div
          v-if="!expanded"
          class="twitter-collapsed"
          v-html="metaData.manipulatedHtml"
        />

        <button
          v-if="!expanded"
          class="link-preview__twitter-expand-btn"
          @click="renderEmbedLink"
        >
          <img
            class="icon"
            src="/icons/twitter.png"
            alt="twitter"
          >
          <span>Expand<br>Tweet</span>
        </button>
      </div>
    </div>


    <!-- Youtube -->
    <div
      v-else-if="linkType === 'youtube'"
      class="video-container"
    >
      <iframe
        width="560"
        height="315"
        :src="`https://www.youtube.com/embed/${youtubeVideoId}?origin=https://907degrees.com`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>


    <!-- Normal -->
    <div
      v-else
      class="link-preview"
    >
      <a
        :href="embedLink"
        target="_blank"
        class="link-preview__link"
      >
        <!-- Normal -->
        <div class="flex-space-between">
          <div class="link-preview__text">
            <div class="link-preview__title">
              <img
                v-if="metaData.icon"
                :src="metaData.icon"
              >
              <span v-if="metaData.title">{{ metaData.title }}</span>
              <span v-else>{{ metaData.provider }} Content</span>
            </div>

            <p class="link-preview__desc">
              {{ metaData.description }}
            </p>
          </div>

          <div class="link-preview__image">
            <img
              v-if="metaData.image"
              :src="metaData.image"
            >
          </div>
        </div>
      </a>
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