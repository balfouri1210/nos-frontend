<template>
  <div class="home">
    <nos-preseason-ui v-if="$store.getters.getAppStatus === 'preseason'" />

    <div
      v-else
      id="home-body"
      class="home__body"
    >
      <client-only>
        <nos-countdown @seasonEnd="seasonEndHandler">
          <p>NEW LEADERBOARD - </p>
        </nos-countdown>
      </client-only>

      <nos-top-player
        :top-player="topPlayer"
        :need-player-comments-preview="true"
      />

      <div class="home__info">
        <div class="home__info-menus">
          <button
            class="home__info-selector"
            @click="selectFixtureMenu"
          >
            <v-icon>mdi-whistle</v-icon>
            <span>Fixtures</span>
          </button>

          <button
            class="home__info-selector"
            @click="selectTableMenu"
          >
            <v-icon>mdi-table-of-contents</v-icon>
            <span>Table</span>
          </button>
        </div>

        <div
          v-if="isFixtures || isTable"
          class="home__info-contents"
        >
          <div class="home__leagues">
            <button
              :class="{'league--selected': selectedLeague === 'pl'}"
              @click="selectLeague('pl')"
            >
              Premier League
            </button>

          <!-- FA컵 결승경기 조회불가로 일단 막아놓음. 다음시즌부터 재개해야 할듯 -->
          <!-- <button
              :class="{'league--selected': selectedLeague === 'facup'}"
              @click="selectLeague('facup')"
            >
              FA Cup
            </button> -->
          </div>


          <!-- FIXTURES AREA -->
          <div
            v-if="isFixtures"
            class="home__fixtures-wrapper"
          >
            <div class="home__fixtures-header">
              <div class="home__fixtures-date">
                <button
                  :class="{'transparent': targetScheduleIndex === 0}"
                  @click="decreaseFixtureDate"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </button>

                <v-progress-circular
                  v-if="isFixturesLoading"
                  :size="20"
                  :width="2"
                  :style="{ margin: '0 20px' }"
                  color="black"
                  indeterminate
                />
                <p v-else>
                  {{ $moment.unix(fixtures[0].event_timestamp).format('YYYY. MM. DD, ddd') }}
                </p>

                <button
                  :class="{'transparent': targetScheduleIndex === selectedLeagueSchedule.length - 1}"
                  @click="increaseFixtureDate"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </button>
              </div>
            </div>


            <div
              v-if="!isFixturesLoading && fixtures.length > 0"
              class="home__fixtures"
              :class="{
                'home__fixtures-grid-1': fixtures.length === 1,
                'home__fixtures-grid-2': fixtures.length === 2,
                'home__fixtures-grid-3': fixtures.length > 2,
              }"
            >
              <div
                v-for="(fixture, index) in fixtures"
                :key="index"
                class="home__fixture"
              >
                <div class="home__fixture-meta">
                  <div class="home__fixture-team">
                    <img
                      :src="fixture.homeTeam.logo"
                      :alt="fixture.homeTeam.team_name"
                    >
                    <p>{{ fixture.homeTeam.team_name }}</p>
                  </div>

                  <div
                    :style="{
                      display: 'block',
                      margin: '4px 8px'
                    }"
                  >
                    <div
                      v-if="fixture.statusShort !== 'NS'"
                      class="fixture__score"
                    >
                      {{ fixture.goalsHomeTeam }} : {{ fixture.goalsAwayTeam }}
                    </div>
                    <div v-else>
                      VS
                    </div>

                    <span
                      v-if="selectedLeague === 'pl'"
                      class="home__fixture-tip home__fixture-round"
                    >R{{ fixture.round.slice(-2) }}</span>
                    <span
                      v-if="fixture.statusShort === '1H' || fixture.statusShort === '2H'"
                      class="home__fixture-tip home__fixture-live"
                    >{{ fixture.statusShort }}</span>
                  </div>

                  <div class="home__fixture-team">
                    <img
                      :src="fixture.awayTeam.logo"
                      :alt="fixture.awayTeam.team_name"
                    >
                    <p>{{ fixture.awayTeam.team_name }}</p>
                  </div>
                </div>

                <p class="home__fixture-sub-info">
                  {{ $moment.unix(fixture.event_timestamp).format('HH:mm') }}, {{ fixture.venue || fixture.round }}
                </p>
              </div>
            </div>

            <div
              v-if="!isFixturesLoading && fixtures.length === 0"
              class="home__no-fixture"
            >
              No fixture
            </div>
          </div>

          <!-- TABLE AREA -->
          <div
            v-if="isTable && leagueTable.length > 0"
            class="home__table"
          >
            <table>
              <thead>
                <th>
                  <v-icon>mdi-table-of-contents</v-icon>
                </th>
                <th>Club</th>
                <th>Points</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GD</th>
                <th>Played</th>
              </thead>

              <tbody>
                <tr
                  v-for="(club, index) in leagueTable"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    <img
                      :src="club.logo"
                      :alt="club.teamName"
                    >
                    {{ club.teamName }}
                  </td>
                  <td>{{ club.points }}</td>
                  <td>{{ club.all.win }}</td>
                  <td>{{ club.all.draw }}</td>
                  <td>{{ club.all.lose }}</td>
                  <td>{{ club.goalsDiff }}</td>
                  <td>{{ club.all.matchsPlayed }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-if="isFixturesLoading || isTableLoading"
            style="margin: 56px 0; text-align: center"
          >
            <v-progress-circular
              :size="30"
              :width="2"
              color="#808080"
              indeterminate
            />
          </div>
        </div>
      </div>

      <nos-player-list
        :top-player-score="parseInt(topPlayer.score)"
        :player-list-prop="high12Players"
        :need-player-comments-preview="true"
      />

      <nos-main-event />

      <nos-player-list
        :top-player-score="parseInt(topPlayer.score)"
        :player-list-prop="restOfPlayers"
        :need-player-comments-preview="true"
        :load-more-player-switch="isBottomOfWindow"
        :previous-player-id-list-prop="previousPlayerIdList"
        @morePlayerLoaded="isBottomOfWindow = false"
      />
    </div>

    <nos-onboarding-ui />

    <!-- Nuxt child for player modal -->
    <nuxt-child />
  </div>
</template>

<script>
import Base from '@/page-resources/index/_base';

export default {
  mixins: [Base],
  head() {
    return {
      title: '907degrees - Hottest Player of The Week',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Find out who is the most interested football player this week and Share thoughts with football fans'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/index/_style.scss";
</style>