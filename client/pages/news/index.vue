<template>
  <div class="news">
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