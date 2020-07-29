<template>
  <transition name="fade">
    <div
      v-if="areFixturesLoaded"
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
            @click="showLastFixtureInfo"
          >
            <p class="fixture__header">
              <span
                v-if="lastFixture.league.name === 'FA Cup'"
                class="fixture__type fa"
              >FA</span>
              <span
                v-if="lastFixture.league.name === 'Premier League'"
                class="fixture__type epl"
              >EPL</span>

              <span class="fixture__timestamp">{{ $moment.utc(lastFixture.event_date).format('YYYY.MM.DD HH:mm') }}</span>

              <span
                v-if="lastFixture.statusShort === '1H' || lastFixture.statusShort === '2H'"
                class="fixture__live"
              >{{ lastFixture.statusShort }}</span>
            </p>

            <div class="fixture__vs">
              <div class="fixture__team">
                <img
                  :src="lastFixture.homeTeam.logo"
                  alt="hometeam"
                >
              </div>

              <div class="fixture__score">
                {{ lastFixture.goalsHomeTeam }} : {{ lastFixture.goalsAwayTeam }}
              </div>

              <div class="fixture__team">
                <img
                  :src="lastFixture.awayTeam.logo"
                  alt="awayteam"
                >
              </div> 
            </div>

            <p
              class="fixture__detail"
              :class="{'fixture__detail--activate': isLastFixtureInfo}"
            >
              Details <v-icon>mdi-chevron-down</v-icon>
            </p>
          </button>

          <transition name="fade">
            <div
              v-if="isLastFixtureInfo"
              class="tooltip"
            >
              <v-progress-circular
                v-if="!isLastFixtureInfoLoaded"
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

                <!-- SHOTS ON GOAL -->
                <div class="tooltip__item">
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
                <div class="tooltip__item">
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
                <div class="tooltip__item">
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
                <div class="tooltip__item">
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
                <div class="tooltip__item">
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
                          name: 'search',
                          query: {
                            keyword: event.splitted_name[event.splitted_name.length - 1]
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
        <div
          v-if="nextFixture"
          class="fixture-wrapper"
        >
          <div class="fixture">
            <p class="fixture__header">
              <span
                v-if="nextFixture.league.name === 'FA Cup'"
                class="fixture__type fa"
              >FA</span>
              <span
                v-if="nextFixture.league.name === 'Premier League'"
                class="fixture__type epl"
              >EPL</span>
              <span class="fixture__timestamp">{{ $moment.utc(nextFixture.event_date).format('YYYY.MM.DD HH:mm') }}</span>
            </p>

            <div class="fixture__vs">
              <div class="fixture__team">
                <img
                  :src="nextFixture.homeTeam.logo"
                  alt="hometeam"
                >
              </div>

              <div class="fixture__score">
                VS
              </div>

              <div class="fixture__team">
                <img
                  :src="nextFixture.awayTeam.logo"
                  alt="awayteam"
                >
              </div> 
            </div>

            <p class="fixture__detail">
              {{ nextFixture.venue || nextFixture.round }}
            </p>

            <div
              v-if="isNextFixtureInfo"
              class="fixture__tooltip"
            >
              <h2>next fixture tooltip</h2>
            </div>
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