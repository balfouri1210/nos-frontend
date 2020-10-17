<template>
  <div class="nos-fixture-stat">
    <v-progress-circular
      v-if="!fixtureInfoLoaded"
      :size="20"
      :width="2"
      :color="'white'"
      indeterminate
    />

    <div v-else>
      <div class="nos-fixture-stat__header">
        <img
          :src="fixture.homeTeam.logo"
          alt="home"
        >

        <span>{{ fixture.venue }}</span>

        <img
          :src="fixture.awayTeam.logo"
          alt="away"
        >
      </div>

      <section class="nos-fixture-stat__statistics">
        <!-- SHOTS ON GOAL -->
        <div
          v-if="fixtureInfo['Shots on Goal']"
          class="nos-fixture-stat__item"
        >
          <p>Shots on Goal</p>

          <div class="nos-fixture-stat__graph-wrapper">
            <span>{{ fixtureInfo['Shots on Goal'].home }}</span>

            <div class="nos-fixture-stat__graph">
              <div
                class="home"
                :style="{
                  flex: fixtureInfo['Shots on Goal'].home / totalPropertyCountOfFixture('Shots on Goal') * 100,
                  borderRadius: fixtureInfo['Shots on Goal'].home / totalPropertyCountOfFixture('Shots on Goal') * 100 === 100 ? '4px' : 0
                }"
              />
              <div
                class="away"
                :style="{
                  flex: fixtureInfo['Shots on Goal'].away / totalPropertyCountOfFixture('Shots on Goal') * 100,
                  borderRadius: fixtureInfo['Shots on Goal'].away / totalPropertyCountOfFixture('Shots on Goal') * 100 === 100 ? '4px' : 0
                }"
              />
            </div>
            <span>{{ fixtureInfo['Shots on Goal'].away }}</span>
          </div>
        </div>

        <!-- BALL POSSESSION -->
        <div
          v-if="fixtureInfo['Ball Possession']"
          class="nos-fixture-stat__item"
        >
          <p>Ball Possession</p>

          <div class="nos-fixture-stat__graph-wrapper">
            <span>{{ fixtureInfo['Ball Possession'].home }}</span>

            <div class="nos-fixture-stat__graph">
              <div
                class="home"
                :style="{
                  flex: fixtureInfo['Ball Possession'].home.replace(/'%'/g, '')
                }"
              />
              <div
                class="away"
                :style="{
                  flex: fixtureInfo['Ball Possession'].away.replace(/'%'/g, '')
                }"
              />
            </div>
            <span>{{ fixtureInfo['Ball Possession'].away }}</span>
          </div>
        </div>

        <!-- FOULS -->
        <div
          v-if="fixtureInfo['Fouls']"
          class="nos-fixture-stat__item"
        >
          <p>Fouls</p>

          <div class="nos-fixture-stat__graph-wrapper">
            <span>{{ fixtureInfo['Fouls'].home }}</span>
            <div class="nos-fixture-stat__graph">
              <div
                class="home"
                :style="{
                  flex: fixtureInfo['Fouls'].home / totalPropertyCountOfFixture('Fouls') * 100
                }"
              />
              <div
                class="away"
                :style="{
                  flex: fixtureInfo['Fouls'].away / totalPropertyCountOfFixture('Fouls') * 100
                }"
              />
            </div>
            <span>{{ fixtureInfo['Fouls'].away }}</span>
          </div>
        </div>

        <!-- TOTAL PASSES -->
        <div
          v-if="fixtureInfo['Total passes']"
          class="nos-fixture-stat__item"
        >
          <p>Total Passes</p>

          <div class="nos-fixture-stat__graph-wrapper">
            <span>{{ fixtureInfo['Total passes'].home }}</span>
            <div class="nos-fixture-stat__graph">
              <div
                class="home"
                :style="{
                  flex: fixtureInfo['Total passes'].home / totalPropertyCountOfFixture('Total passes') * 100
                }"
              />
              <div
                class="away"
                :style="{
                  flex: fixtureInfo['Total passes'].away / totalPropertyCountOfFixture('Total passes') * 100
                }"
              />
            </div>
            <span>{{ fixtureInfo['Total passes'].away }}</span>
          </div>
        </div>

        <!-- PASS ACCURACY -->
        <div
          v-if="fixtureInfo['Passes %']"
          class="nos-fixture-stat__item"
        >
          <p style="margin-bottom: 8px">
            Pass Accuracy
          </p>

          <div
            class="nos-fixture-stat__graph-wrapper"
            style="margin-bottom: 2px"
          >
            <div style="margin-right: 12px">
              <span>{{ fixture.homeTeam.team_name.slice(0, 3) }}</span>
              <span
                :style="{
                  display: 'inline-block',
                  marginLeft: '4px',
                  fontSize: '20px',
                  color: '#2cb6ff'
                }"
              >{{ fixtureInfo['Passes %'].home }}</span>
            </div>

            <div>
              <span>{{ fixture.awayTeam.team_name.slice(0, 3) }}</span>
              <span
                :style="{
                  display: 'inline-block',
                  marginLeft: '4px',
                  fontSize: '20px',
                  color: '#8ced03'
                }"
              >{{ fixtureInfo['Passes %'].away }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- EVENTS -->
      <section
        v-if="fixtureEvents.length > 0"
        class="nos-fixture-stat__event-wrapper"
      >
        <p class="section-title">
          Goals
        </p>

        <ul>
          <li
            v-for="(event, index) in fixtureEvents"
            :key="index"
            class="nos-fixture-stat__event"
          >
            <nuxt-link
              :to="localePath({
                name: 'search-searchData',
                params: {
                  searchData: `keyword_${event.splitted_name[event.splitted_name.length - 1]}`
                }
              })"
            >
              <p>{{ event.teamName }}</p>
              <p style="margin: 0 12px">
                -
              </p>
              <div>
                <p style="line-height: 18px">
                  {{ event.player }}, {{ event.elapsed + event.elapsed_plus }}'
                </p>
                <p
                  v-if="event.detail !== 'Normal Goal'"
                  :style="{
                    fontSize: '12px',
                    fontWeight: 300,
                    lineHeight: '16px' 
                  }"
                >
                  ({{ event.detail }})
                </p>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </section>


      <!-- ON YOUTUBE -->
      <section class="nos-fixture-stat__on-youtube">
        <p class="section-title">
          Videos
        </p>

        <button @click="watchOnYoutube(fixture.homeTeam.team_name, fixture.awayTeam.team_name)">
          On YouTube<img
            src="logos/youtube.png"
            alt="youtube"
          >
        </button>
      </section>
    </div>

    <div
      v-if="getFixtureInfoFailed"
      class="nos-fixture-stat__error"
    >
      <p>Sorry, looks like we’re having some issues :( Please try again after a while.</p>
    </div>
  </div>
</template>

<script>
import Base from './_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>