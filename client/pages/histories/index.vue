<template>
  <div class="histories">
    <div class="histories__desc">
      <p>This is a page where you can check the past rankings. Select month and click on each section to see detailed rankings and fan reactions of the time.</p>
    </div>

    <div class="histories__header">
      <div class="histories__header-content">
        <div class="histories__year">
          <button
            v-if="selectedYear > 2020"
            class="histories__year-mobile-arrow"
            @click="decreaseYear"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </button>

          <button
            class="histories__year-web-arrow"
            @click="increaseYear"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </button>

          <h1>{{ selectedYear }}</h1>

          <button
            v-if="selectedYear > 2020"
            class="histories__year-web-arrow"
            @click="decreaseYear"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </button>

          <button
            class="histories__year-mobile-arrow"
            @click="increaseYear"
          >
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
                <div>
                  <span class="histories__month-num">{{ month.num }}</span><span class="histories__month-name">{{ month.name }}</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
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
        <h1>No histories during this period</h1>
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
              name: 'history-historyId',
              params: {
                historyId: history.id
              }
            })"
            @click.native="selectHistory"
          >
            <div class="histories__link-content">
              <div class="histories__period">
                <div
                  v-if="history.id === $store.getters.getLatestHistoryId"
                  class="histories__period-latest"
                >
                  <p>Latest History</p>
                </div>
                {{ $moment.utc(history.start_date).format('MM. DD') }} <span class="histories__period-time">{{ $moment.utc(history.start_date).format('HH:mm') }}</span>
                ~ {{ $moment.utc(history.end_date).format('MM. DD') }} <span class="histories__period-time">{{ $moment.utc(history.end_date).format('HH:mm') }}</span>
              </div>

              <ul class="histories__top5Players">
                <li
                  v-for="(player, playerIndex) in history.players"
                  :key="playerIndex"
                >
                  <p>
                    <img
                      class="histories__club"
                      :src="player.club_image"
                      :alt="player.club_team_id"
                    >
                    <span class="histories__name">{{ player.known_as }}</span>
                  </p>

                  <span class="histories__dob">
                    <img
                      :src="`${nosImageUrl}/flags/${player.country_code.toLowerCase()}.png`"
                      :alt="player.country_code"
                    >
                    {{ $moment.unix(player.birthday).format('DD. MM. YYYY') }} |
                    {{ player.position }}
                  </span>
                </li>
              </ul>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Base from '@/page-resources/histories/_base';

export default {
  layout: 'wide',
  mixins: [Base],
  head() {
    return {
      title: '907Degrees - Histories',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Check previous leaderboard and fans' reaction"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/histories/_style.scss";
</style>