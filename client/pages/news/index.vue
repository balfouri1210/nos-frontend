<template>
  <div class="news">
    <!-- league news -->
    <div>
      <div class="news__header">
        <button
          class="btn-neumorphism news__header-pl-btn"
          :class="{'news-selected-target': searchTarget === 'league'}"
          @click="selectSearchTarget('league')"
        >
          <img
            src="/leagues/premier_league_logo.svg"
            alt="premier league"
          >
        </button>

        <nos-clubs
          :selected-club-id="selectedClub.id"
          @select-club="selectSearchTarget"
        />
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

    <!-- select club -->
    <!-- <div class="news__clubs">
      <p class="news__clubs-title">
        Select the club you want and check the news
      </p>
    </div> -->

    <!-- club news -->
    <!-- <div v-if="selectedClub">
      <div class="news__header">
        <img
          class="news__header-club-img"
          :src="selectedClub.image"
          :alt="selectedClub.clean_name"
        >

        <div class="news__header-club-name">
          <span>{{ selectedClub.clean_name }}</span>
          <a
            :href="selectedClub.official_site"
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
            v-for="(clubNews, newsIndex) in selectedClub.newsList"
            :key="newsIndex"
          >
            <nos-news-item :news="clubNews" />
          </li>
        </ul>
      </div>
    </div> -->
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