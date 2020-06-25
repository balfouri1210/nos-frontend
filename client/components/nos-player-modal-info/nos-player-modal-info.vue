<template>
  <div class="player-modal-info">
    <div class="player">
      <button
        class="player__image"
        :style="{
          backgroundImage: `url(${nosImageUrl}/players/${player.id}.jpg), url(${nosImageUrl}/players/default2.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }"
        @click="watchOnYoutube"
      >
        <div class="player__header">
          <p
            v-if="playerTemperature > 0"
            class="player__temperature"
            :class="{
              'player--degrees-over-0': playerTemperature >= 0 && playerTemperature < 100,
              'player--degrees-over-100': playerTemperature >= 100 && playerTemperature < 300,
              'player--degrees-over-200': playerTemperature >= 300 && playerTemperature < 500,
              'player--degrees-over-400': playerTemperature >= 500 && playerTemperature < 700,
              'player--degrees-over-600': playerTemperature >= 700 && playerTemperature < 900,
              'player--degrees-over-800': playerTemperature >= 900
            }"
          >
            <v-icon>mdi-fire</v-icon>
            <span>{{ playerTemperature }}</span>
          </p>

          <p class="player__hits-and-comment">
            <v-icon>mdi-eye-outline</v-icon>
            <span>{{ player.hits | thousandSeparator }}</span>
          </p>
        </div>

        <div class="player__footer">
          <img
            src="logos/youtube.png"
            alt="youtube"
          >
        </div>
      </button>

      <div class="player__meta-wrapper">
        <div class="player__meta">
          <p class="player__meta-header">
            <span class="player__meta-name">{{ player.known_as }}</span>
          </p>

          <p class="player__meta-item">
            <span>DoB / Height</span>
            <span>{{ $moment.unix(player.birthday).format('YYYY. MM. DD') }} / {{ player.height }} cm</span>
          </p>

          <p class="player__meta-item">
            <span>Nationality</span>
            <span>
              <img
                class="player__meta-flag"
                :src="`/flags/${player.country_code.toLowerCase()}.png`"
                :alt="player.country_code"
              >
              {{ player.country_name }}
            </span>
          </p>

          <p class="player__meta-item">
            <span>Club</span>
            <span><img
              class="player__meta-emblem"
              :src="player.club_image"
              alt="club"
            > {{ player.club_name }}</span>
          </p>

          <p class="player__meta-item">
            <span>Position</span>
            <span>{{ player.position | positionExtension }}</span>
          </p>
        </div>

        <div class="player__vote">
          <button
            v-for="(vote, index) in playerVotes.slice(0, 3)"
            v-if="vote.count > 0"
            :key="index"
            class="player__vote-btn"
            :class="{
              'player__vote--voted': player.vote === vote.name,
              'player__vote--thumb': vote.name === 'up' || vote.name === 'down',
              'player__vote--disabled': disabled
            }"
            :disabled="disabled || isVoting"
            @click="addPlayerVote(vote.name)"
          >
            <v-icon>{{ vote.iconName }}</v-icon>
            <span>{{ player[`vote_${vote.name}_count`] | thousandSeparator }}</span>
          </button>

          <button
            class="player__vote-more-btn"
            @click="showAllVotes"
          >
            <v-icon>mdi-plus</v-icon>
            <span>React</span>
          </button>
        </div>
      </div>
    </div> 

    <!-- SHOW ALL OF VOTES -->
    <v-dialog
      v-model="allVotes"
      content-class="player__all-votes-dialog"
      max-width="320px"
    >
      <v-card>
        <v-card-title>Reactions</v-card-title>
        <v-divider />
        <div class="player__all-votes">
          <button
            v-for="(vote, index) in playerVotes"
            :key="index"
            class="player__vote-btn"
            :class="{
              'player__vote--voted': player.vote === vote.name,
              'player__vote--thumb': vote.name === 'up' || vote.name === 'down',
              'player__vote--disabled': disabled
            }"
            :disabled="disabled || isVoting"
            @click="addPlayerVote(vote.name)"
          >
            <v-icon>{{ vote.iconName }}</v-icon>
            <span>{{ player[`vote_${vote.name}_count`] | thousandSeparator }}</span>
          </button>
        </div>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="#f4991e"
            text
            @click="allVotes = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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