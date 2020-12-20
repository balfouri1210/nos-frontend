<template>
  <a
    :href="news.url"
    class="news-item"
    :class="{'news-item--without-thumbnail': !news.image}"
    target="_blank"
  >
    <div
      v-if="news.image"
      class="news-item__thumbnail"
      :style="{
        backgroundImage: `url('${news.image.contentUrl}'), url('${news.image.thumbnail.contentUrl}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }"
    />

    <div class="news-item__info">
      <div style="width: 100%">
        <p class="news-item__title">
          {{ news.name }}
        </p>
        <span class="news-item__published-at">
          {{ $moment(news.datePublished).fromNow() }} / <span style="font-weight: 500">{{ news.provider[0].name }}</span>
        </span>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>