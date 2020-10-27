<template>
  <transition name="fade">
    <div
      v-if="areFixturesLoaded && this.$store.getters['auth/getAuthorization'] !== 3"
      class="fixture-area"
    >
      <div
        v-if="isHeader"
        class="fixture-area__header"
      >
        <span>Fixtures</span>
      </div>

      <div class="fixture-area__body">
        <!-- LAST FIXTURE -->
        <div
          v-if="lastFixture"
          class="fixture-wrapper"
        >
          <div class="fixture">
            <div class="fixture__header flex-basic">
              <img
                v-if="lastFixture.league.name !== 'League Cup'"
                :src="lastFixture.league.logo"
                :alt="lastFixture.league.name"
              >
              <div>
                <p class="fixture__league-name">
                  {{ lastFixture.league.name }}
                </p>
                <span class="fixture__timestamp">{{ $moment.utc(lastFixture.event_date).format('MM.DD, ddd HH:mm') }}</span>
              </div>
            </div>
            <span class="fixture__timestamp">(Local: {{ $moment(lastFixture.event_date).format('MM.DD, ddd HH:mm') }})</span>

            <div class="fixture__vs">
              <div class="fixture__team">
                <img
                  :src="lastFixture.homeTeam.logo"
                  alt="hometeam"
                >
                <span>{{ lastFixture.homeTeam.team_name }}</span>
              </div>

              <div class="fixture__score">
                <div>
                  {{ lastFixture.goalsHomeTeam || 0 }} : {{ lastFixture.goalsAwayTeam || 0 }}
                </div>

                <span
                  v-if="lastFixture.statusShort === '1H' || lastFixture.statusShort === '2H'"
                  class="fixture__live"
                >{{ lastFixture.statusShort }}</span>
              </div>

              <div class="fixture__team">
                <img
                  :src="lastFixture.awayTeam.logo"
                  alt="awayteam"
                >
                <span>{{ lastFixture.awayTeam.team_name }}</span>
              </div> 
            </div>

            <button
              class="fixture__players"
              style="margin-bottom: 4px;"
              @click="goToFixturePlayers(lastFixture)"
            >
              Search by Club
            </button>

            <button
              class="fixture__stat"
              :class="{'fixture__stat--activate': showLastFixtureInfo}"
              @click="showLastFixtureInfo = !showLastFixtureInfo"
            >
              Details <v-icon>mdi-chevron-down</v-icon>
            </button>
          </div>

          <transition
            v-if="showLastFixtureInfo"
            name="fade"
          >
            <nos-fixture-stat
              :fixture="lastFixture"
            />
          </transition>
        </div>

        <div
          v-else-if="!lastFixture"
          class="fixture-wrapper fixture-empty"
        >
          <p>Sorry, looks like we’re having some issues :( Please try again after a while.</p>
        </div>


        <!-- NEXT FIXTURE -->
        <div class="fixture-wrapper">
          <div
            v-if="nextFixture"
            class="fixture"
          >
            <div class="fixture__header flex-basic">
              <img
                v-if="nextFixture.league.name !== 'League Cup'"
                :src="nextFixture.league.logo"
                :alt="nextFixture.league.name"
              >
              <div>
                <p class="fixture__league-name">
                  {{ nextFixture.league.name }}
                </p>
                <span class="fixture__timestamp">{{ $moment.utc(nextFixture.event_date).format('MM.DD, ddd HH:mm') }}</span>
              </div>
            </div>
            <span class="fixture__timestamp">(Local: {{ $moment(nextFixture.event_date).format('MM.DD, ddd HH:mm') }})</span>

            <div class="fixture__vs">
              <div class="fixture__team">
                <img
                  :src="nextFixture.homeTeam.logo"
                  alt="hometeam"
                >
                <span>{{ nextFixture.homeTeam.team_name }}</span>
              </div>

              <div class="fixture__score">
                VS
              </div>

              <div class="fixture__team">
                <img
                  :src="nextFixture.awayTeam.logo"
                  alt="awayteam"
                >
                <span>{{ nextFixture.awayTeam.team_name }}</span>
              </div>
            </div>

            <button
              class="fixture__players"
              style="margin-bottom: 4px;"
              @click="goToFixturePlayers(nextFixture)"
            >
              Search by Club
            </button>

            <p class="fixture__detail">
              {{ nextFixture.venue || nextFixture.round }}
            </p>
          </div>

          <div
            v-else
            class="fixture-empty"
          >
            <v-icon>mdi-whistle</v-icon>
            <p>No fixtures<br>currently available</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
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