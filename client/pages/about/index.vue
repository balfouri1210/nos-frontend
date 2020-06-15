<template>
  <div class="about">
    <!-- INTRO -->
    <div class="about__intro">
      <div class="about__title">
        <v-icon class="gradient-text">
          mdi-fire
        </v-icon>
        <h1>
          WEEKLY<br>HOTTEST PLAYER
        </h1>
      </div>

      <div>
        <div class="about__desc">
          <p>Who are the players you are interested in this week?</p>
          <p>
            907Degrees is a community designed for the football fans to explore their interest for the players on a weekly basis.
            We want to share thoughts on various players.
          </p>
          <p>Statistics? meh.. We think Fans' interests are more valuable and hotting up.</p>
          <p>That is why we named the community 907Degrees. (90Min + 7Days)</p>
        </div>
      </div>
    </div>

    <div class="about__below">
      <!-- LEADERBOARD -->
      <div class="about__title">
        <h1>
          LEADERBOARD
        </h1>
      </div>

      <div class="about__container">
        <div class="about__desc">
          The leaderboard has the following characteristics.
          <p>
            * The rankings are decided only based on the fans’ reaction of the week.
            For the most searched players and more of the back-and-forth discussions between fans,
            the temperature of the player goes up and becomes the top of the leaderboard.
            Therefore, the 907 leaderboard is irreverent to the actual skill of the player. 
          </p>

          <p>
            * Any player can be on the top leaderboard:
            amazing player, unsung hero, and funny player.
            The statistics of goals and passes are not reflected. 
          </p>

          <p>
            * Players without temperature get ranked randomly.
          </p>

          <p>
            * The Leaderboard resets every <span style="color: #f4991e">Friday at 18:00 UTC</span>, for the next 6 hours we prepare a new leaderboard.
            During the pre-season, users can search the players they are interested in and show interest.
            The purpose of the pre-season is to prevent the ranking forming by the few users right after the reset.
          </p>
        </div>

        <div class="about__image-container">
          <div class="about__weekly-flow1" />
          <div class="about__linker">
            <v-icon>mdi-chevron-down</v-icon>
            <p>Reset every<br>Friday 18:00 UTC</p> 
          </div>

          <div class="about__weekly-flow2" />

          <div class="about__linker">
            <v-icon>mdi-chevron-down</v-icon>
            <p>After 6hours,<br>New Leaderboard</p> 
          </div>
          <div class="about__weekly-flow3" />
        </div>
      </div> 


      <!-- TEMPERATURE -->
      <div class="about__title">
        <h1>
          TEMPERATURE
        </h1>
      </div>

      <div class="about__container">
        <div class="about__desc">
          <p>
            The temperature of the player with the most attention is 907 degrees.
          </p>
          <p>
            Based on this player the rest of players’ temperature is listed on the upper right of the card.
            If the second player’s temperature is at 300 degrees, this means the top player is getting all the attention.
          </p>
        </div>

        <div class="about__dummy-item">
          <div
            :style="{
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              top: '6px',
              right: '12px',
            }"
          >
            <v-icon style="margin-right: 2px; color: red; font-size: 18px">
              mdi-fire
            </v-icon>
            <span style="color: red">
              867</span>
          </div>
        </div>
      </div>


      <!-- REACTION -->
      <div class="about__title">
        <h1>
          REACTION
        </h1>
      </div>

      <div class="about__container">
        <div class="about__desc">
          Show your interest by commenting and reacting on the player.
        </div>

        <div class="about__dummy-comment">
          <div><span>No one could stop him! His performance saved the team.</span></div>
          <div>ADD</div>
        </div>

        <div class="about__dummy-reaction">
          <button disabled>
            <v-icon>mdi-thumb-up</v-icon>
            <span>1,624</span>
          </button>

          <button
            disabled
            class="voted"
          >
            <v-icon>mdi-arm-flex</v-icon>
            <span>738</span>
          </button>

          <button disabled>
            <v-icon>mdi-battery-high</v-icon>
            <span>92</span>
          </button>

          <button
            disabled
            class="vote-more-btn"
          >
            <v-icon>mdi-plus</v-icon>
            <span>More</span>
          </button>
        </div>
      </div>


      <!-- HISTORY -->
      <div class="about__title">
        <h1>
          HISTORY
        </h1>
      </div>

      <div class="about__container">
        <div>
          <v-icon
            style="font-size: 100px"
            class="gradient-text"
          >
            mdi-history
          </v-icon>
        </div>

        <div class="about__desc">
          <p>
            If you want to check previous history, click the icon on the header.
          </p>
          <p>
            You can check the weekly leaderboard, comments and reactions.
          </p>
        </div>
      </div>


      <!-- COMMUNITY GUIDE -->
      <div
        id="community-guide"
        class="about__title"
      >
        <h1>
          COMMUNITY GUIDE
        </h1>
      </div>

      <div class="about__container">
        <div>
          <v-icon
            style="font-size: 90px"
            class="gradient-text--purple"
          >
            mdi-message-processing-outline
          </v-icon>
        </div>

        <div class="about__desc">
          <p>
            Every user has a right to express freely and this cannot be violated by other users.
          </p>
          <p>
            However, without minimum guidelines the harm can be brought to the community, players, and users.
            Please refer to the rules listed below and join keeping the community safe. Thank you.
          </p>

          <p style="margin-top: 16px">
            907 can restrict or delete the following comments without warning.
          </p>
          <p class="about__strong">
            * Severe insult, sexual harassment, and malicious attack on players.
          </p>
          <p class="about__strong">
            * Severe insult, sexual harassment, and malicious attack on other users.
          </p>
          <p class="about__strong">
            * Spreading false information about players or other users.
          </p>
          <p class="about__strong">
            * Comments that promotes or condones violence against individuals
            or groups based on race or ethnic origin, religion, disability, gender,
            age, nationality, veteran status, caste,
            or content that incites hatred on the basis of these core characteristics.
          </p>
          <p class="about__strong">
            * Comments impersonating or aggravating conflicts.
          </p>
          <p class="about__strong">
            * Socialization that is influential on public opinion.
          </p>
          <p class="about__strong">
            * Simultaneous posting/duplicate comments.
          </p>

          <p style="margin-top: 16px">
            The account with repeated actions written above will be restricted.
          </p>
          <p>
            Users can report the comments that violated the guidelines. An account with repeated reports
            will be restricted after the internal review.
          </p>
          <p>
            907 users communicate in English.
          </p>
        </div>
      </div>
    </div>

    <div class="about__inspiration">
      <img
        src="/images/ege_bayrak.png"
        alt="we_are_one"
      >

      <div class="about__video">
        <iframe
          id="ytplayer"
          type="text/html"
          :src="`https://www.youtube.com/embed/BgomX3qD-iA?origin=https://907degrees.com`"
          frameborder="0"
          allow="autoplay"
          allowfullscreen="allowfullscreen"
          mozallowfullscreen="mozallowfullscreen" 
          msallowfullscreen="msallowfullscreen" 
          oallowfullscreen="oallowfullscreen" 
          webkitallowfullscreen="webkitallowfullscreen"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'wide',
  transition: 'fade',

  data() {
    return {
      nosImageUrl: process.env.NOS_IMAGE_URL
    };
  },

  mounted() {
    if (this.$route.hash === '#community-guide')
      this.$scrollTo('#community-guide', 300, { offset: -120 });
  },

  head() {
    return {
      title: 'About 907Degrees',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'What is 907Degrees?'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/about/_style.scss";
</style>