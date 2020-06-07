<template>
  <div class="player-modal-info">
    <div class="player">
      <div
        class="player__image"
        :style="{
          backgroundImage: `url(${nosImageUrl}/players/${player.id}.jpg), url(${nosImageUrl}/players/default.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }"
      />

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
            <span>Team</span>
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

        <client-only>
          <div class="player__vote">
            <button
              v-for="(vote, index) in voteList.slice(0, 3)"
              v-if="vote.count > 0"
              :key="index"
              class="player__vote-btn"
              :class="{
                'player__vote--voted': player.vote === vote.name,
                'player__vote--thumb': vote.name === 'up' || vote.name === 'down'
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
              <span>More</span>
            </button>
          </div>
        </client-only>
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
            v-for="(vote, index) in voteList"
            :key="index"
            class="player__vote-btn"
            :class="{
              'player__vote--voted': player.vote === vote.name,
              'player__vote--thumb': vote.name === 'up' || vote.name === 'down'
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