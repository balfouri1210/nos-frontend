<template>
  <div class="nos-news-headline">
    <div
      v-if="isHeader"
      class="nos-news-headline__header"
    >
      <div class="nos-news-headline__sorting">
        <button
          class="nos-news-headline__sortby-btn"
          :class="{'nos-news-headline__sortby-btn--active': newsSortCriteria === 'date'}"
          @click="setNewsSortCriteria('date')"
        >
          <span>Date</span>
        </button>

        <button
          class="nos-news-headline__sortby-btn"
          :class="{'nos-news-headline__sortby-btn--active': !newsSortCriteria}"
          @click="setNewsSortCriteria()"
        >
          <span>Relevance</span>
        </button>
      </div>
    </div>

    <div class="nos-news-headline__content">
      <div class="nos-news-headline__content-ul-wrapper">
        <ul>
          <li
            v-for="(news, index) in newsList"
            :key="index"
            class="nos-news-headline__item flex-basic"
          >
            <a
              :href="news.url"
              target="_blank"
            >
              <div
                v-if="news.image"
                class="nos-news-headline__thumbnail-wrapper"
              >
                <div
                  class="nos-news-headline__thumbnail"
                  :style="{
                    backgroundImage: `url('${news.image.contentUrl}'), url('${news.image.thumbnail.contentUrl}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                  }"
                />
              </div>

              <div
                class="nos-news-headline__info"
                :class="{'flex-none': !news.image}"
              >
                <span
                  class="nos-news-headline__provider"
                >{{ news.provider[0].name }}</span>

                <p
                  class="nos-news-headline__title"
                  :class="{'ellipsis-2': news.image, 'nos-news-headline__title--larged': !news.image}"
                >
                  {{ news.name }}
                </p>

                <span class="nos-news-headline__published-at">{{ $moment(news.datePublished).format('DD MMM YYYY, HH:mm') }}</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
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