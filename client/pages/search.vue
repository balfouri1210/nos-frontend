<template>
  <div class="search">
    <div
      v-if="searchPlayerList.length > 0"
      class="search__body"
    >
      <div class="search__title">
        <h2 v-if="$route.query.keyword">
          <span>Search result of</span>"{{ $route.query.keyword }}"
        </h2>

        <div
          v-else
          class="search__title-club"
        >
          <img
            :src="targetClub.image"
            :alt="targetClub.clean_name"
          >

          <div>
            <h2 v-if="targetClub.clean_name">
              {{ targetClub.clean_name }}
            </h2>

            <a
              v-if="targetClub.clean_name"
              :href="targetClub.official_site"
              target="_blank"
            >Official Website</a>
          </div>
        </div>

        <div class="search__fixtures-area">
          <nos-fixtures-area :club-id="parseInt($route.query.clubId)" />
        </div>
      </div>

      <nos-player-list
        :top-player="topPlayer"
        :initial-player-list="searchPlayerList"
      />
    </div>

    <div
      v-else
      class="search__empty"
    >
      <h1>"{{ $route.query.keyword }}"</h1>
      <h2>No results found</h2>
      <p>Try different keywords or filter by club</p>
    </div>

    <!-- Nuxt child for player modal -->
    <nuxt-child />
  </div>
</template>

<script>
import Base from '@/page-resources/search/_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/search/_style.scss";
</style>