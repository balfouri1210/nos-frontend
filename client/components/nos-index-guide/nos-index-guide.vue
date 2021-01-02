<template>
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
</template>

<script>
export default {
  data() {
    return {
      showWhatIs907: false,
      showGuide: false,
      nosImageUrl: process.env.NOS_IMAGE_URL
    };
  }
};
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>