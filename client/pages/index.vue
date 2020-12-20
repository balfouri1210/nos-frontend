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


      <!-- 907DEGREES CONCEPT and GUIDE FOR NEW USER -->
      <div class="home__guide">
        <button
          class="home__guide-introduce"
          @click="showWhatIs907 = !showWhatIs907; showGuide = false"
        >
          What is 907 ?
        </button>

        <button
          class="home__guide-qna"
          @click="showGuide = !showGuide; showWhatIs907 = false"
        >
          Guide for New users
        </button>

        <a
          href="https://www.instagram.com/907degrees"
          target="_blank"
          class="home__sns-instagram"
        >
          <v-icon>mdi-instagram</v-icon>
        </a>


        <!-- WHAT IS 907 CONTENT -->
        <div class="home__guide-wrapper">
          <div
            v-if="showWhatIs907"
            class="home__guide-introduce-desc"
          >
            <div class="home__guide-backdrop">
              <button
                class="home__guide-close"
                @click="showWhatIs907 = false"
              >
                <v-icon>mdi-close</v-icon>
              </button>

              <div class="home__guide-text">
                <div style="text-align: center; margin-bottom: 12px;">
                  <img
                    :src="`${nosImageUrl}/logos/logo_white2.svg`"
                    alt="logo"
                  >
                </div>

                <div style="margin-bottom: 24px;">
                  "The most on fire player of the week"
                  <br>907 is a space where you can check who is the player gets
                  a lot of attention from football fans, and communicate with other fans every week.
                  That is why we named the community 907Degrees. (90Min + 7Days)
                </div>

                <div style="margin-bottom: 24px;">
                  Playing and watching football are both fun,
                  <br>Checking and communicating with fans' thoughts and reactions is what makes me really fun.
                  <br>There are times when they make spiteful jokes or swear, but I genuinuely feel love for football in each of those events.
                  <br>So I wanted to create a space where fans could freely talk about all players.
                  <br>I wanted to know who was the player most noticed by fans around the world, rather than through a specific medium.
                </div>

                <div style="margin-bottom: 24px; text-align: center">
                  New Star,
                  <br>A Captain that will remain in history,
                  <br>Unsung Hero,
                  <br>Fighter,
                  <br>Troublemaker,
                  <br>Dummy
                  <br>And Fan
                </div>

                <div>
                  All of these people love football and that's why they have the right to enjoy football.
                  <br>907 is welcome to all football fans. If you like football and want to communicate with other fans, please visit 907 anytime.
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- WHAT IS 907 CONTENT END -->

        <!-- GUIDE FOR NEW USERS CONTENT -->
        <div class="home__guide-wrapper">
          <div
            v-if="showGuide"
            class="home__guide-qna-desc"
          >
            <div class="home__guide-backdrop">
              <button
                class="home__guide-close"
                @click="showGuide = false"
              >
                <v-icon>mdi-close</v-icon>
              </button>

              <div class="home__guide-text">
                <div style="margin-bottom: 24px;">
                  <h2>What can I do when I register as a member?</h2>
                  <div class="home__guide-detail">
                    You can leave reactions and comments to each player.
                    <br>You can like / dislike other users' opinions.
                    <br>You can reply to other users' opinions.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>What is the player arrangement criteria?</h2>
                  <div class="home__guide-detail">
                    The rankings are decided only based on the fans’ reaction of the week. For the most searched players and more of the back-and-forth discussions between fans, the temperature of the player goes up and becomes the top of the leaderboard.
                  </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                  <h2>What is the ‘New’ sign?</h2>
                  <div class="home__guide-detail">
                    Indicates that a new comment was added within the last 12 hours.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>What is the fireworks display?</h2>
                  <div class="home__guide-detail">
                    The degree to which the player is interested is quantified by temperature.
                    <br>The first place player is 907 degrees Celsius, and the remaining players are calculated based on the score of the first place player.
                    <br>The temperature rises in proportion to the number of views, comments, and reactions.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>How can I leave a comment?</h2>
                  <div class="home__guide-detail">
                    After logging in, you can easily leave a new comment by clicking on the desired player.
                  </div>
                </div>


                <div style="margin-bottom: 24px;">
                  <h2>When is the leaderboard reset?</h2>
                  <div class="home__guide-detail">
                    The Leaderboard resets every Friday at 18:00 UTC, 6 hours after initialization, we have a pre-season period to prevent ranking by a few.
                    You can't see the leaderboard for a while, but you can use all other features such as player inquiry and comments.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>What are the comments on the leaderboard?</h2>
                  <div class="home__guide-detail">
                    Shows the most recent comments so that you can preview the comments posted to each player.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>There is no player I want on the leaderboard</h2>
                  <div class="home__guide-detail">
                    Search for the player through the magnifying glass <v-icon>mdi-magnify</v-icon> in the header. You can find the player you want by keyword, team or country.
                    Find the player you want, search it, and leave a comment. If the player gets a lot of attention, he will gradually rise to the top of the leaderboard.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>Are there any players from other leagues?</h2>
                  <div class="home__guide-detail">
                    No, only PL players are registered at this time.
                    When a certain level of users gather, we are considering expanding the league as a top priority.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>How can I view past history</h2>
                  <div class="home__guide-detail">
                    Go to the history page via the time icon <v-icon>mdi-history</v-icon> in the header. You can view the weekly leaderboard at any time you would like.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>How can I see all the comments at once</h2>
                  <div class="home__guide-detail">
                    Scroll down and click 'More' in the comment area. You can check the latest comments and comments that received a lot of likes.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>What is the hot comment criteria?</h2>
                  <div class="home__guide-detail">
                    Comments that received more than 5 likes.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>Can I include a link in the comment?</h2>
                  <div class="home__guide-detail">
                    Yes, if you include the link you want in the comment, it will automatically detect the link and generate a preview.
                    YouTube, Instagram, and Twitter support embed link to preview videos and photos.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>Can I see the news?</h2>
                  <div class="home__guide-detail">
                    Yes, click on a player on the leaderboard to see the news for that player.
                  </div>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2>Can I view match and ranking information?</h2>
                  <div class="home__guide-detail">
                    Yes, click the black fixture and table button on the leaderboard
                  </div>
                </div>

                <div>
                  <h2>Can I communicate directly with the developer?</h2>
                  <div class="home__guide-detail">
                    Yes,
                    <br>Email: support@907degrees.com
                    <br>Instagram: 907degrees_official
                    <br>Twitter: 907Degrees
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- GUIDE FOR NEW USERS CONTENT END -->
      </div>
      <!-- END -->


      <!-- PLAYERS -->
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
            <v-icon>mdi-equalizer</v-icon>
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

                <p>
                  {{ $moment.utc(selectedLeagueSchedule[targetScheduleIndex]).format('YYYY. MM. DD, ddd') }}
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
              v-if="getFixturesFailed"
              class="home__no-fixture"
            >
              Sorry, looks like we’re having some issues :(<br>Please try again after a while.
            </div>

            <div
              v-else-if="!isFixturesLoading && !fixtures"
              class="home__no-fixture"
            >
              No fixture
            </div>

            <div
              v-else-if="!isFixturesLoading && fixtures.length > 0"
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
                    <div v-if="fixture.statusShort === 'PST'">
                      PST
                    </div>
                    <div
                      v-else-if="fixture.statusShort !== 'NS'"
                      class="fixture__score"
                    >
                      {{ fixture.goalsHomeTeam || 0 }} : {{ fixture.goalsAwayTeam || 0 }}
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
                  <span v-if="fixture.statusShort === 'PST'">Match Postponed</span>
                  <span v-else>
                    <span>{{ $moment.unix(fixture.event_timestamp).utc().format('HH:mm') }}, {{ fixture.venue || fixture.round }}</span>
                    <span>( Local time : {{ $moment.unix(fixture.event_timestamp).format('MM. DD, ddd HH:mm') }} )</span>
                  </span>
                </p>

                <div style="margin-top: 8px;">
                  <button
                    class="home__fixture-players"
                    @click="goToFixturePlayers(fixture)"
                  >
                    Search by Club
                  </button>

                  <button
                    v-if="fixture.status !== 'Not Started'"
                    class="home__fixture-stat"
                    :class="{'home__fixture-stat--activate': fixture.showFixtureInfo}"
                    @click="fixture.showFixtureInfo = !fixture.showFixtureInfo"
                  >
                    Details <v-icon>mdi-chevron-down</v-icon>
                  </button>
                </div>

                <transition
                  v-if="fixture.showFixtureInfo"
                  name="fade"
                >
                  <nos-fixture-stat
                    :fixture="fixture"
                  />
                </transition>
              </div>
            </div>
          </div>


          <!-- LEAGUE TABLE AREA -->
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
                  <td
                    style="cursor: pointer"
                    @click="selectClubInTable(club)"
                  >
                    <img
                      :src="club.logo"
                      :alt="club.teamName"
                    >
                    {{ club.teamName }}
                    <v-icon>mdi-open-in-new</v-icon>
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
        :player-list-prop="high4Players"
        :need-player-comments-preview="true"
        :start-rank="2"
      />


      <!-- MAIN NEWS -->
      <div class="home__section-title">
        <p>
          <v-icon>mdi-newspaper-variant</v-icon>
          Premier League news
        </p>

        <nuxt-link :to="localePath('news')">
          More<v-icon>mdi-chevron-right</v-icon>
        </nuxt-link>
      </div>
      <nos-news-headline />


      <nos-player-list
        :top-player-score="parseInt(topPlayer.score)"
        :player-list-prop="high6Players"
        :need-player-comments-preview="true"
        :start-rank="6"
      />


      <!-- COMMENT AREA -->
      <nos-landing-comment-area />


      <nos-player-list
        :top-player-score="parseInt(topPlayer.score)"
        :player-list-prop="restOfPlayers"
        :need-player-comments-preview="true"
        :activate-load-more="true"
        :previous-player-id-list-prop="previousPlayerIdList"
        :start-rank="14"
      />

      <!-- <nos-main-event /> -->
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
      title: '907degrees - The most on fire player of the week',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Find out who is the most interested football player this week and Share thoughts with football fans'
        },

        // Opengraph
        {
          property: 'og:title',
          content:
            "The most on fire player of the week - Leaderboard, News & Fans' Reaction"
        },
        {
          property: 'og:site_name',
          content: '907Degrees'
        },
        // {
        //   'property':  'og:description',
        //   'content': 'Community designed for the football fans to explore their interest for the players on a weekly basis'
        // },
        {
          property: 'og:url',
          content: '907degrees.com'
        },
        {
          property: 'og:image',
          content: 'https://907degrees.com/opengraph.png'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/index/_style.scss";
@import "@/page-resources/index/_guide.scss";
</style>