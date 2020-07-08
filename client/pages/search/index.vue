<template>
  <div class="search">
    <div class="search__body">
      <div class="search__title">
        <h2 v-show="$route.query.keyword">
          <span>Search result for</span>"{{ $route.query.keyword }}"
        </h2>

        <div
          v-show="$route.query.clubId"
          class="search__title-club"
        >
          <img
            :src="targetClub.image"
            :alt="targetClub.clean_name"
          >

          <div>
            <h2 v-show="targetClub.clean_name">
              {{ targetClub.clean_name }}
            </h2>

            <a
              v-show="targetClub.official_site"
              :href="targetClub.official_site"
              target="_blank"
            >Official Website</a>
          </div>
        </div>

        <div
          v-show="$route.query.clubId"
          class="search__fixtures-area"
        >
          <nos-fixtures-area :club-id="parseInt($route.query.clubId)" />
        </div>
      </div>

      <nos-player-list
        v-if="searchPlayerList.length > 0"
        :top-player="topPlayer"
        :initial-player-list="searchPlayerList"
        :need-player-comments-preview="true"
        :need-player-meta="true"
        @selectPlayer="selectPlayerHandler"
      />
    </div>


    <!-- PLAYER MODAL  -->
    <div v-if="isPlayerModalOpen">
      <nos-player-modal
        :player="targetPlayer"
        :initial-comments="targetPlayerComments"
        @closePlayerModal="closePlayerModalHandler"
      />
    </div>


    <div class="search__progress-circular">
      <v-progress-circular
        v-if="!isSearchFinished"
        :size="20"
        :width="2"
        :color="'#808080'"
        indeterminate
      />
    </div>


    <!-- NO SEARCH RESULT UI -->
    <div
      v-if="isSearchFinished && searchPlayerList.length === 0"
      class="search__empty"
    >
      <h2>No results found</h2>
      <p>Try different keywords or filter by club</p>
    </div>
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