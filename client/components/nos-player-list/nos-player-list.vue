<template>
  <div id="player-list-wrapper">
    <!-- 907DEGREES PLAYER -->
    <button
      class="player-top"
      @click="selectPlayer(topPlayer)"
    >
      <div class="player-top__div">
        <div class="player__header">
          <div class="player__hits-and-comment">
            <p>
              <v-icon>mdi-eye</v-icon>
              <span>{{ topPlayer.hits | thousandSeparator }}</span>
            </p>

            <p>
              <v-icon>mdi-message-processing-outline</v-icon>
              <span>{{ topPlayer.comment_count | thousandSeparator }}</span>
            </p>
          </div>
        </div>

        <div
          class="player-top__image"
          :style="{
            backgroundImage: `url(${nosImageUrl}/players/${topPlayer.id}.jpg), url(${nosImageUrl}/players/default2.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }"
        >
          <div
            class="player__meta"
            style="height: 25%"
          >
            <p>
              <span>{{ $moment.unix(topPlayer.birthday).format('YYYY. MM. DD') }}</span>
              <span v-if="topPlayer.height > 0"> / {{ topPlayer.height }}cm</span>
            </p>
          </div>
        </div>

        <div class="player-top__meta">
          <div class="player-top__meta-content">
            <img
              :src="`/flags/${topPlayer.country_code.toLowerCase()}.png`"
              :alt="topPlayer.country_code"
            >
            <div class="player-top__profile-wrapper">
              <p class="player-top__known-as">
                {{ topPlayer.known_as }}
              </p>
            </div>
          </div>
        </div>
      </div> 

      <img
        src="https://images.907degrees.com/logos/logo.svg"
        alt="logo"
        class="player-top__logo"
      >
    </button>


    <!-- REST OF PLAYERS -->
    <ul
      class="player-list"
    >
      <li
        v-for="(player, index) in playerList"
        :key="index"
        class="player"
        :class="{'player--without-image': player.image_url === 'n'}"
      >
        <button @click="selectPlayer(player)">
          <div class="player__header">
            <div class="player__hits-and-comment">
              <p>
                <v-icon>mdi-eye-outline</v-icon>
                <span>{{ player.hits | thousandSeparator }}</span>
              </p>

              <p>
                <v-icon>mdi-message-processing-outline</v-icon>
                <span>{{ player.comment_count | thousandSeparator }}</span>
              </p>
            </div>

            <p
              v-if="degreeCalculator(player.score) > 0"
              class="player__temperature"
              :class="{
                'player--degrees-over-0': degreeCalculator(player.score) >= 0 && degreeCalculator(player.score) < 100,
                'player--degrees-over-100': degreeCalculator(player.score) >= 100 && degreeCalculator(player.score) < 300,
                'player--degrees-over-200': degreeCalculator(player.score) >= 300 && degreeCalculator(player.score) < 500,
                'player--degrees-over-400': degreeCalculator(player.score) >= 500 && degreeCalculator(player.score) < 700,
                'player--degrees-over-600': degreeCalculator(player.score) >= 700 && degreeCalculator(player.score) < 900,
                'player--degrees-over-800': degreeCalculator(player.score) >= 900
              }"
            >
              <v-icon>mdi-fire</v-icon>
              <span>{{ degreeCalculator(player.score) }}</span>
            </p>
          </div>

          <div
            v-if="player.image_url === 'y'"
            class="player__image"
            :style="{
              backgroundImage: `url(${nosImageUrl}/players/${player.id}.jpg), url(${nosImageUrl}/players/default2.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }"
          />

          <div class="player__meta">
            <div>
              <img
                v-if="player.image_url === 'n'"
                :class="{'centered': player.image_url === 'n'}"
                class="player__meta-club"
                :src="player.club_image"
                alt="club"
              >

              <p>
                <img
                  class="player__meta-flag"
                  :src="`/flags/${player.country_code.toLowerCase()}.png`"
                  :alt="player.country_code"
                >
                {{ player.known_as }}
              </p>
              <p>
                <span>{{ $moment.unix(player.birthday).format('YYYY. MM. DD') }}</span>
                <span v-if="player.height > 0"> / {{ player.height }}cm</span>
              </p>
            </div>
          </div>
        </button>
      </li>
    </ul>

    <div
      v-if="isMorePlayersLoading"
      class="player-list__loader"
    >
      <v-progress-circular
        :size="26"
        :width="3"
        color="#808080"
        indeterminate
      />
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
@import "./_style.scss";
</style>