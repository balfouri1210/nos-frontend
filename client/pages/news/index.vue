<template>
  <div class="news">
    <div>
      <div class="news__header">
        <img
          class="news__header-pl-img"
          src="/leagues/1.png"
          alt="premier league"
        >
      </div>

      <div class="news__body">
        <ul>
          <li
            v-for="(news, index) in newsList"
            :key="index"
          >
            <nos-news-item :news="news" />
          </li>
        </ul>
      </div>
    </div>

    <p class="news__clubs-title">
      Select the club you want and check the news
    </p>
    <nos-clubs @select-club="selectClubHandler" />

    <div
      v-for="(club, clubIndex) in selectedClubList"
      :key="clubIndex"
    >
      <div class="news__header">
        <img
          class="news__header-club-img"
          :src="club.image"
          :alt="club.clean_name"
        >

        <div class="news__header-club-name">
          <span>{{ club.clean_name }}</span>
          <a
            :href="club.official_site"
            target="_blank"
          >
            <v-icon>mdi-open-in-new</v-icon>
            Official Website
          </a>
        </div>
      </div>

      <div class="news__body">
        <ul>
          <li
            v-for="(clubNews, newsIndex) in club.newsList"
            :key="newsIndex"
          >
            <nos-news-item :news="clubNews" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Base from '@/page-resources/news/_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import '@/page-resources/news/_style.scss';
</style>