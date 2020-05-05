<template>
  <div class="histories">
    <div class="histories__year">
      <button
        v-if="selectedYear > 2020"
        @click="decreaseYear"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </button>
      <h1>{{ selectedYear }}</h1>
      <button @click="increaseYear">
        <v-icon>mdi-chevron-right</v-icon>
      </button>
    </div>

    <div class="histories__month-wrapper">
      <ul class="histories__month-list">
        <li
          v-for="(month, index) in months"
          :key="index"
        >
          <button
            class="histories__month"
            :class="{'histories__month--selected': isMonthSelected(month)}"
            @click="selectMonth(month)"
          >
            <span>{{ month.name }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div
      v-if="isHistoryLoading"
      class="centered"
    >
      <v-progress-circular
        :size="40"
        :width="3"
        :color="'#808080'"
        indeterminate
      />
    </div>

    <div
      v-else
      class="histories__content"
    >
      <div
        v-if="histories.length === 0"
        class="histories__empty centered"
      >
        <h1>EMPTY PERIOD</h1>
      </div>

      <ul
        v-else
        class="histories__list"
      >
        <li
          v-for="(history, index) in histories"
          :key="index"
          class="histories__item"
        >
          <nuxt-link 
            class="histories__link"
            :to="localePath({
              name: 'history-historyId-player',
              params: {
                historyId: history.id
              }
            })"
            @click.native="selectHistory"
          >
            <p class="histories__period">
              {{ $moment.utc(history.start_date).format('MM. DD') }} <span>{{ $moment.utc(history.start_date).format('HH:mm') }}</span>
              ~ {{ $moment.utc(history.end_date).format('MM. DD') }} <span>{{ $moment.utc(history.end_date).format('HH:mm') }}</span>
            </p>

            <ul class="histories__top5Players">
              <li
                v-for="(player, playerIndex) in history.players"
                :key="playerIndex"
              >
                <p>
                  <img
                    class="histories__flag"
                    :src="`/flags/${player.country_code.toLowerCase()}.png`"
                    :alt="player.country_code"
                  >
                  {{ player.known_as }}
                </p>

                <span>{{ $moment.unix(player.birthday).format('YYYY. MM. DD') }} |
                  <img
                    class="histories__club"
                    :src="player.club_image"
                    :alt="player.club_team_id"
                  >
                  {{ player.position }}
                </span>
              </li>
            </ul>
          </nuxt-link>
        </li>
      </ul>
    </div>

    <!-- <div
      class="histories__load-more"
    >
      <button
        :disabled="histories[histories.length - 1].id === 1"
        class="nos-basic-btn"
        @click="loadMoreHistories"
      >
        <v-progress-circular
          v-if="isMoreHistoriesLoading"
          class="centered"
          :size="20"
          :width="3"
          color="white"
          indeterminate
        />

        <span v-else>
          <span v-if="histories[histories.length - 1].id === 1">All histories are loaded</span>
          <span v-else>Load More Histories</span>
        </span>
      </button>
    </div> -->
  </div>
</template>

<script>
import Base from '@/page-resources/histories/_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/histories/_style.scss";
</style>