<template>
  <div class="search">
    <div class="search__body">
      <div class="search__header">
        <div
          v-if="searchKeyword || !isEmpty(targetCountry)"
          class="search__header-keyword"
        >
          <h2 class="flex-basic">
            <span>Search result for</span>
            <span v-if="searchKeyword">"{{ searchKeyword }}"</span>

            <span v-else-if="!isEmpty(targetCountry)">
              {{ targetCountry.name }}
              <img
                :src="`${nosImageUrl}/flags/${targetCountry.code.toLowerCase()}.png`"
                :alt="targetCountry.code"
              >
            </span>
          </h2>
        </div>

        <div
          v-else-if="!isEmpty(targetClub)"
          class="search__header-club"
        >
          <div class="search__club-name">
            <img
              :src="targetClub.image"
              :alt="targetClub.clean_name"
            >

            <div>
              <h2>{{ targetClub.clean_name }}</h2>

              <a
                :href="targetClub.official_site"
                target="_blank"
              >Official Website</a>
            </div>
          </div>

          <div
            v-if="clubStanding.forme"
            class="search__club-standing"
          >
            <p>League: {{ clubStanding.rank | rankFormatter }}</p>
            <div class="search__forme flex-basic">
              <div
                v-for="(forme, index) in clubStanding.forme.split('')"
                :key="index"
              >
                <span
                  :class="{
                    'forme-w': forme === 'W',
                    'forme-d': forme === 'D',
                    'forme-l': forme === 'L'
                  }"
                  class="search__forme-item flex-basic"
                >{{ forme }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="targetClubs">
          <span>Search result</span>
        </div>

        <!-- <div
          v-if="!isEmpty(targetClub)"
          class="search__fixtures-area"
        >
          <nos-fixtures-area :club-id="parseInt(targetClub.id)" />
        </div> -->
      </div>

      <nos-news-headline
        v-if="!isEmpty(targetClub)"
        :news-keyword="targetClub.clean_name"
      />

      <nos-player-list
        v-if="searchPlayerList.length > 0"
        :top-player-score="parseInt(topPlayerScore)"
        :player-list-prop="searchPlayerList"
        :need-player-comments-preview="true"
        :need-player-meta="true"
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
      <p>Try different keywords or filter by club.</p>
      <p>Currently, only PL players being uploaded.</p>
    </div>

    <nuxt-child />
  </div>
</template>

<script>
import Base from '@/page-resources/search/_base';

export default {
  layout: 'wide',
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/search/_style.scss";
</style>