<template>
  <div id="player-list-wrapper">
    <button
      class="player-top"
      @click="selectPlayer(topPlayer)"
    >
      <div class="player-top__div">
        <div
          class="player-top__image"
          :style="{
            backgroundImage: `url(${topPlayer.imgSrc}), url(/player_default.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }"
        />

        <div class="player-top__meta">
          <div class="player-top__meta-content">
            <img
              :src="`/flags/${topPlayer.country_code.toLowerCase()}.png`"
              alt="flag"
            >
            <p>{{ topPlayer.known_as }}<span>-</span><br>{{ $moment.unix(topPlayer.birthday).format('YYYY. MM. DD') }}</p>
          </div>
        </div>
      </div> 

      <img
        src="/logos/logo.svg"
        alt="logo"
        class="player-top__logo"
      >
    </button>

    <ul
      class="player-list"
    >
      <li
        v-for="(player, index) in playerList"
        :key="index"
        class="player"
      >
        <button @click="selectPlayer(player)">
          <div class="player__header">
            <p
              v-if="degreeCalculator(player.score) > 0"
              :class="{
                'player--degrees-over-0': degreeCalculator(player.score) >= 0 && degreeCalculator(player.score) < 100,
                'player--degrees-over-100': degreeCalculator(player.score) >= 100 && degreeCalculator(player.score) < 300,
                'player--degrees-over-300': degreeCalculator(player.score) >= 300 && degreeCalculator(player.score) < 500,
                'player--degrees-over-500': degreeCalculator(player.score) >= 500 && degreeCalculator(player.score) < 700,
                'player--degrees-over-700': degreeCalculator(player.score) >= 700 && degreeCalculator(player.score) < 900,
                'player--degrees-over-900': degreeCalculator(player.score) >= 900
              }"
            >
              {{ degreeCalculator(player.score) }}
            </p>
          </div>

          <div
            class="player__image"
            :style="{
              backgroundImage: `url(${player.imgSrc}), url(/player_default.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }"
          />
          <div class="player__meta">
            <p>
              <img
                :src="`/flags/${player.country_code.toLowerCase()}.png`"
                alt="flag"
              >{{ player.known_as }}
            </p>
            <p>{{ $moment.unix(player.birthday).format('YYYY. MM. DD') }}<span v-if="player.height > 0"> / {{ player.height }}cm</span></p>
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
        color="#f4991e"
        indeterminate
      />
    </div>
  </div>
</template>

<script>
import Base from './_base';

export default {
  mixins: [Base],

  props: {
    initialPlayerList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>