<template>
  <div class="nos-player-modal-info">
    <div class="npmi__header">
      <div class="npmi__header-ranking">
        <span>Weekly Ranking</span>
        <p>{{ player.ranking | thousandSeparator }}</p>
      </div>

      <h2 class="npmi__name">
        {{ player.known_as }}
      </h2>

      <button
        class="npmi__on-youtube"
        @click="watchOnYoutube(player.known_as)"
      >
        <img
          src="logos/youtube.png"
          alt="youtube"
        >
        <span>On Youtube</span>
      </button>
    </div>


    <!-- History Notice -->
    <div
      v-if="isHistorical"
      class="npmi__history-notice"
    >
      This is history page. ({{ $moment.utc(history.start_date).format('DD. MM. YYYY') }} ~ {{ $moment.utc(history.end_date).format('DD. MM. YYYY') }}) You can leave new comments or reactions about {{ player.known_as }} <nuxt-link
        :to="localePath({
          name: 'index-player-playerId-playerName',
          params: {
            playerId: player.id,
            playerName: player.known_as.toLowerCase().replace(/ /g, '-')
          }
        })"
      >
        Here
      </nuxt-link>
    </div> 


    <div class="npmi__body">
      <div class="npmi__ranking-and-reactions">
        <div class="npmi__body-ranking">
          <span>Weekly Ranking</span>
          <p>{{ player.ranking | thousandSeparator }}</p>
        </div>

        <div class="npmi__reactions">
          <span>Reactions</span>

          <div class="npmi__vote">
            <button
              v-for="(vote, index) in playerVotes.slice(0, 3)"
              v-show="vote.count > 0"
              :key="index"
              class="npmi__vote-btn"
              :class="{
                'npmi__vote--voted': player.vote === vote.name,
                'npmi__vote--thumb': vote.name === 'up' || vote.name === 'down',
                'npmi__vote--disabled': disabled
              }"
              :disabled="disabled || isVoting"
              @click="addPlayerVote(vote.name)"
            >
              <v-icon>{{ vote.iconName }}</v-icon>
              <span>{{ player[`vote_${vote.name}_count`] | thousandSeparator }}</span>
            </button>

            <button
              class="npmi__vote-more-btn"
              @click="showAllVotes"
            >
              <v-icon>mdi-plus</v-icon>
              <v-icon>mdi-emoticon-happy-outline</v-icon>
            </button>
          </div>
        </div>
      </div>


      <!-- Fake Votes -->
      <div
        v-if="$store.getters['auth/getAuthorization'] === 3 && !isHistorical"
        class="npmi__all-votes"
        style="grid-template-columns: repeat(6, 1fr); margin-top: 12px; padding: 0"
      >
        <button
          v-for="(vote, index) in playerVotes"
          :key="index"
          class="npmi__vote-btn"
          :class="{
            'npmi__vote--thumb': vote.name === 'up' || vote.name === 'down',
          }"
          :disabled="disabled || isVoting"
          style="border-color: #1976d2"
          @click="requestAddPlayerFakeVote(vote.name)"
        >
          <v-icon style="color: #1976d2">
            {{ vote.iconName }}
          </v-icon>
          <span>{{ player[`vote_${vote.name}_count`] | thousandSeparator }}</span>
        </button>
      </div>


      <div class="npmi__personal-detail">
        <div class="npmi__personal-detail-item">
          <p class="npmi__personal-detail-title">
            <v-icon>mdi-eye-outline</v-icon>
            <span>Views</span>
          </p>
          <p class="npmi__personal-detail-info">
            <span>{{ player.hits | thousandSeparator }}</span>
            <button
              v-if="$store.getters['auth/getAuthorization'] === 3 && !isHistorical"
              @click="requestPlayerFakeHits(player)"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </button>
          </p>
        </div>

        <div
          v-if="playerTemperature > 0" 
          class="npmi__personal-detail-item"
        >
          <p class="npmi__personal-detail-title">
            <v-icon>mdi-fire</v-icon>
            <span>Temp</span>
          </p>
          <p class="npmi__personal-detail-info npmi__temperature">
            {{ playerTemperature }}<span>deg</span>
          </p>
        </div>

        <div class="npmi__personal-detail-item">
          <p class="npmi__personal-detail-title">
            <v-icon>mdi-account</v-icon>
            <span>Day of Birth</span>
          </p>
          <p class="npmi__personal-detail-info">
            {{ $moment.unix(player.birthday).format('DD. MM. YYYY') }}
          </p>
        </div>

        <div class="npmi__personal-detail-item">
          <p class="npmi__personal-detail-title">
            <v-icon>mdi-human-male-height</v-icon>
            <span>Height</span>
          </p>
          <p class="npmi__personal-detail-info npmi__height">
            {{ player.height }}<span>cm</span>
          </p>
        </div>

        <div class="npmi__personal-detail-item">
          <p class="npmi__personal-detail-title">
            <v-icon>mdi-run</v-icon>
            <span>Position</span>
          </p>
          <p class="npmi__personal-detail-info">
            {{ player.position }}
          </p>
        </div>
      </div>

      <div class="npmi__affiliation">
        <div class="npmi__affiliation-club">
          <span>
            <v-icon>mdi-shield-star</v-icon>
            Club
          </span>

          <button
            :style="{
              border: `1px solid ${player.club_color}`,
              backgroundColor: `rgba(${hexToRgb(player.club_color)}, 0.1)`
            }"
            @click="goToSearchWithClub(player.club_id)"
          >
            <img
              :src="player.club_image"
              :alt="player.club_name"
            >
            <p>{{ player.club_name }}</p>
            <v-icon>mdi-open-in-new</v-icon>
          </button>
        </div>

        <div class="npmi__affiliation-nation">
          <span>
            <v-icon>mdi-web</v-icon>
            Nationality
          </span>

          <button @click="goToSearchWithCountry(player.country_code.toLowerCase(), player.country_id)">
            <img
              style="box-shadow: 0 0 1px 0.5px rgba(0, 0, 0, 0.15);"
              :src="`${nosImageUrl}/flags/${player.country_code.toLowerCase()}.png`"
              :alt="player.country_code"
            >
            <p>{{ player.country_name }}</p>
            <v-icon>mdi-open-in-new</v-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- SHOW ALL OF VOTES -->
    <v-dialog
      v-model="allVotes"
      content-class="npmi__all-votes-dialog"
      max-width="320px"
    >
      <v-card>
        <v-card-title>Reactions</v-card-title>
        <v-divider />
        <div class="npmi__all-votes">
          <button
            v-for="(vote, index) in playerVotes"
            :key="index"
            class="npmi__vote-btn"
            :class="{
              'npmi__vote--voted': player.vote === vote.name,
              'npmi__vote--thumb': vote.name === 'up' || vote.name === 'down',
              'npmi__vote--disabled': disabled
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
@import './_style.scss';
</style>