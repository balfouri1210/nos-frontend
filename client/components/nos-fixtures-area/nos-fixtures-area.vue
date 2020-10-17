<template>
  <transition name="fade">
    <div
      v-if="isFixtureRender"
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
          :style="{marginRight: '4px'}"
        >
          <button
            class="fixture"
            @click="getLastFixtureInfo"
          >
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
                <span class="fixture__timestamp">{{ $moment.utc(lastFixture.event_date).format('YYYY.MM.DD HH:mm') }}</span>
              </div>
            </div>

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

            <p
              class="fixture__detail"
              :class="{'fixture__detail--activate': showLastFixtureInfo}"
            >
              Details <v-icon>mdi-chevron-down</v-icon>
            </p>
          </button>

          <transition name="fade">
            <div
              v-if="showLastFixtureInfo"
              class="tooltip"
            >
              <v-progress-circular
                v-if="!showLastFixtureInfoLoaded"
                :size="20"
                :width="2"
                :color="'white'"
                indeterminate
              />

              <div v-else>
                <div class="tooltip__header">
                  <img
                    :src="lastFixture.homeTeam.logo"
                    alt="home"
                  >

                  <span>{{ lastFixture.venue }}</span>

                  <img
                    :src="lastFixture.awayTeam.logo"
                    alt="away"
                  >
                </div>

                <section class="tooltip__statistics">
                  <!-- SHOTS ON GOAL -->
                  <div
                    v-if="lastFixtureInfo['Shots on Goal']"
                    class="tooltip__item"
                  >
                    <p>Shots on Goal</p>

                    <div class="tooltip__graph-wrapper">
                      <span>{{ lastFixtureInfo['Shots on Goal'].home }}</span>

                      <div class="tooltip__graph">
                        <div
                          class="home"
                          :style="{
                            flex: lastFixtureInfo['Shots on Goal'].home / totalPropertyCountOfFixture('Shots on Goal') * 100,
                            borderRadius: lastFixtureInfo['Shots on Goal'].home / totalPropertyCountOfFixture('Shots on Goal') * 100 === 100 ? '4px' : 0
                          }"
                        />
                        <div
                          class="away"
                          :style="{
                            flex: lastFixtureInfo['Shots on Goal'].away / totalPropertyCountOfFixture('Shots on Goal') * 100,
                            borderRadius: lastFixtureInfo['Shots on Goal'].away / totalPropertyCountOfFixture('Shots on Goal') * 100 === 100 ? '4px' : 0
                          }"
                        />
                      </div>
                      <span>{{ lastFixtureInfo['Shots on Goal'].away }}</span>
                    </div>
                  </div>

                  <!-- BALL POSSESSION -->
                  <div
                    v-if="lastFixtureInfo['Ball Possession']"
                    class="tooltip__item"
                  >
                    <p>Ball Possession</p>

                    <div class="tooltip__graph-wrapper">
                      <span>{{ lastFixtureInfo['Ball Possession'].home }}</span>

                      <div class="tooltip__graph">
                        <div
                          class="home"
                          :style="{
                            flex: lastFixtureInfo['Ball Possession'].home.replace(/'%'/g, '')
                          }"
                        />
                        <div
                          class="away"
                          :style="{
                            flex: lastFixtureInfo['Ball Possession'].away.replace(/'%'/g, '')
                          }"
                        />
                      </div>
                      <span>{{ lastFixtureInfo['Ball Possession'].away }}</span>
                    </div>
                  </div>

                  <!-- FOULS -->
                  <div
                    v-if="lastFixtureInfo['Fouls']"
                    class="tooltip__item"
                  >
                    <p>Fouls</p>

                    <div class="tooltip__graph-wrapper">
                      <span>{{ lastFixtureInfo['Fouls'].home }}</span>
                      <div class="tooltip__graph">
                        <div
                          class="home"
                          :style="{
                            flex: lastFixtureInfo['Fouls'].home / totalPropertyCountOfFixture('Fouls') * 100
                          }"
                        />
                        <div
                          class="away"
                          :style="{
                            flex: lastFixtureInfo['Fouls'].away / totalPropertyCountOfFixture('Fouls') * 100
                          }"
                        />
                      </div>
                      <span>{{ lastFixtureInfo['Fouls'].away }}</span>
                    </div>
                  </div>

                  <!-- TOTAL PASSES -->
                  <div
                    v-if="lastFixtureInfo['Total passes']"
                    class="tooltip__item"
                  >
                    <p>Total Passes</p>

                    <div class="tooltip__graph-wrapper">
                      <span>{{ lastFixtureInfo['Total passes'].home }}</span>
                      <div class="tooltip__graph">
                        <div
                          class="home"
                          :style="{
                            flex: lastFixtureInfo['Total passes'].home / totalPropertyCountOfFixture('Total passes') * 100
                          }"
                        />
                        <div
                          class="away"
                          :style="{
                            flex: lastFixtureInfo['Total passes'].away / totalPropertyCountOfFixture('Total passes') * 100
                          }"
                        />
                      </div>
                      <span>{{ lastFixtureInfo['Total passes'].away }}</span>
                    </div>
                  </div>

                  <!-- PASS ACCURACY -->
                  <div
                    v-if="lastFixtureInfo['Passes %']"
                    class="tooltip__item"
                  >
                    <p style="margin-bottom: 8px">
                      Pass Accuracy
                    </p>

                    <div
                      class="tooltip__graph-wrapper"
                      style="margin-bottom: 2px"
                    >
                      <div style="margin-right: 12px">
                        <span>{{ lastFixture.homeTeam.team_name.slice(0, 3) }}</span>
                        <span
                          :style="{
                            display: 'inline-block',
                            marginLeft: '4px',
                            fontSize: '20px',
                            color: '#2cb6ff'
                          }"
                        >{{ lastFixtureInfo['Passes %'].home }}</span>
                      </div>

                      <div>
                        <span>{{ lastFixture.awayTeam.team_name.slice(0, 3) }}</span>
                        <span
                          :style="{
                            display: 'inline-block',
                            marginLeft: '4px',
                            fontSize: '20px',
                            color: '#8ced03'
                          }"
                        >{{ lastFixtureInfo['Passes %'].away }}</span>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- EVENTS -->
                <section
                  v-if="lastFixtureEvents.length > 0"
                  class="tooltip__event-wrapper"
                >
                  <p class="section-title">
                    Goals
                  </p>

                  <ul>
                    <li
                      v-for="(event, index) in lastFixtureEvents"
                      :key="index"
                      class="tooltip__event"
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
                <section class="tooltip__on-youtube">
                  <p class="section-title">
                    Videos
                  </p>

                  <button @click="watchOnYoutube(lastFixture.homeTeam.team_name, lastFixture.awayTeam.team_name)">
                    On YouTube<img
                      src="logos/youtube.png"
                      alt="youtube"
                    >
                  </button>
                </section>
              </div>

              <div
                v-if="getLastFixtureInfoFailed"
                class="tooltip__error"
              >
                <p>Sorry, looks like we’re having some issues :( Please try again after a while.</p>
              </div>
            </div>
          </transition>
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
                <span class="fixture__timestamp">{{ $moment.utc(nextFixture.event_date).format('YYYY.MM.DD HH:mm') }}</span>
              </div>
            </div>

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