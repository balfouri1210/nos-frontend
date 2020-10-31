<template>
  <div class="news-area">
    <div class="news-area__header">
      <div class="news-area__header-title">
        <span>News</span>
      </div>

      <div class="news-area__sorting">
        <button
          class="news-area__sortby-btn"
          :class="{'news-area__sortby-btn--active': newsSortCriteria === 'date'}"
          @click="setNewsSortCriteria('date')"
        >
          <span>Date</span>
        </button>

        <button
          class="news-area__sortby-btn"
          :class="{'news-area__sortby-btn--active': !newsSortCriteria}"
          @click="setNewsSortCriteria()"
        >
          <span>Relevance</span>
        </button>
      </div>
    </div>

    <div
      v-if="isNewLoadFailed"
      class="centered news-area__load-failed"
    >
      <v-icon>
        mdi-alert-circle-outline
      </v-icon>
      <p>
        Sorry, looks like we’re having some issues :( Please try again after a while.
      </p>
    </div> 

    <div class="news-area__news-list">
      <ul>
        <li
          v-for="(news, index) in newsList"
          :key="index"
        >
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
              <p class="news-item__title">
                {{ news.name }}
              </p>
              <span class="news-item__published-at">
                {{ $moment.utc(news.datePublished).format('YY-MM-DD HH:mm') }} / {{ news.provider[0].name }}
              </span>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <!-- <div
      v-if="!isAllNewsLoaded && newsList.length > 0"
      class="news-area__load-more-news"
    >
      <button @click="loadMoreNews">
        <v-progress-circular
          v-if="isMoreNewsLoading"
          :size="20"
          :width="2"
          color="#808080"
          indeterminate
        />
        <span v-else>Load More News</span>
      </button>
    </div> -->


    <div
      v-if="isNewsLoading"
      class="centered"
    >
      <v-progress-circular
        :size="20"
        :width="2"
        color="#808080"
        indeterminate
      />
    </div>

    <div
      v-if="!isNewsLoading && isAllNewsLoaded && newsList.length === 0"
      class="news-area__empty centered"
    >
      No results found
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