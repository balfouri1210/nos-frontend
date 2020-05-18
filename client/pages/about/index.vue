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
          <p>
            907은 일주일동안 축구팬들이 누구에게 관심이 있는지 알아보고,
            함께 이야기 나누기 위해 만들어진 커뮤니티입니다.
          </p>
          <p>
            통계는 차갑지만, 팬들의 관심은 뜨겁다고 생각합니다.
          </p>
          <p>
            커뮤니티 이름이 907DEGREES인 이유입니다.
          </p>
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
          907의 주별 리더보드는 다음과 같은 특성을 가집니다.
          <p>
            * 골, 패스성공률 등의 선수 통계에 영향을 받지 않습니다.
          </p>

          <p>
            * 한 주의 축구팬 반응에 의해서만 순위가 결정됩니다.
            조회수가 얼마나 높은지, 댓글과 리액션이 활발하게 이루어지는지 측정합니다.
            ( 그러므로 907의 리더보드는 선수의 실력과 무관합니다 )
          </p>

          <p>
            * 언성히어로, 엉망이었던 선수, 가장 웃겼던 선수 누구나 리더보드 최상위에
            위치할 수 있습니다.
          </p>

          <p>
            * 리더보드는 매주 금요일 18시 (UTC)에 초기화되며 초기화 후 6시간 동안
            새로운 리더보드를 준비합니다. (Preseason)
            프리시즌 기간동안 유저들은 원하는 선수를 검색해 관심을 표현할 수 있습니다.
            프리시즌을 갖는 이유는 리셋 후 소수에 의해 초반 순위가 형성되는 것을
            방지하기 위해서입니다.
          </p>
        </div>

        <div class="about__image-container">
          <div class="about__weekly-flow1" />
          <div class="about__linker">
            <v-icon>mdi-chevron-down</v-icon>
            <p>Reset every<br>Friday 18:00 (UTC)</p> 
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
            가장 많은 관심을 받은 선수의 온도는 907도 입니다.
          </p>
          <p>
            이 선수를 기준으로 나머지선수의 온도가 카드 우측 상단에 표시됩니다.
            두번째 선수의 온도가 300도라면 최상위 선수가 독보적인 관심을 받는 것입니다.
          </p>
        </div>

        <div class="about__dummy-item">
          <span
            :style="{
              position: 'absolute',
              top: '6px',
              right: '12px',
              color: 'red'
            }"
          >867</span>
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
          코멘트와 리액션으로 선수에 대한 관심을 표현하세요.
        </div>

        <div class="about__dummy-comment">
          <div><span>How was N'Golo Kanté this week?</span></div>
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
            히스토리가 궁금하다면 헤더의 타임라인 아이콘을 클릭해보세요.
          </p>
          <p>
            각 주의 리더보드와 댓글, 리액션을 확인 할 수 있습니다.
          </p>
        </div>
      </div>


      <!-- COMMUNITY GUIDE -->
      <div class="about__title">
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
            기본적으로 모든 유저들에게는 표현의 자유가 있으며, 이를 다른 유저가 침해해서는 안됩니다.
          </p>
          <p>
            그러나 최소한의 가이드가 없다면 커뮤니티와 선수, 선량한 유저들이 피해를 입을 수 있습니다.
          </p>
          <p>
            아래 사항들을 참고하여 건전한 커뮤니티를 만드는데 동참해주세요. 감사합니다.
          </p>

          <p style="margin-top: 16px">
            907은 다음과 같은 의견을 제재하거나 경고 없이 삭제할 수 있습니다.
          </p>
          <p>
            * 선수나 다른 유저에 대한 심한 모욕이나 악의적 공격
          </p>
          <p>
            * 선수나 다른 유저에 대한 허위사실 유포
          </p>
          <p>
            * 인종이나 민족, 국적, 종교, 장애, 성별, 연령에 따라 개인이나 그룹에 대한 폭력을
            선동하거나 용납하는 의견 또는 이러한 핵심 특성을 기준으로 증오를 조장하는 의견
          </p>

          <p style="margin-top: 16px">
            * 위와 같은 행위가 반복되는 계정에 대해서는 경고 없이 제재를 가할 수 있습니다.
          </p>
          <p>
            * 유저들은 위 가이드에 위배되는 의견을 신고할 수 있습니다. 다수의 신고를 받은 의견은
            내부 검토 후 제재를 받습니다.
          </p>
          <p>
            * 907은 기본적으로 영어로 소통합니다.
          </p>
        </div>
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
  }
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/about/_style.scss";
</style>