<template>
  <div class="player-modal-info">
    <div class="player">
      <div
        class="player__image"
        :style="{
          backgroundImage: `url(${nosImageUrl}/players/david_beckham.jpg), url(/player_default.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }"
      />

      <div class="player__meta-wrapper">
        <div class="player__meta">
          <p class="player__meta-header">
            <img
              class="player__meta-flag"
              :src="`/flags/${player.country_code.toLowerCase()}.png`"
              :alt="player.country_code"
            >
            <span class="player__meta-name">{{ player.known_as }}</span>
          </p>
          <p class="player__meta-item">
            <span>Date of birth</span>
            <span>{{ $moment.unix(player.birthday).format('YYYY. MM. DD') }}</span>
          </p>
          <p class="player__meta-item">
            <span>Height</span>
            <span>{{ player.height }} cm</span>
          </p>
          <p class="player__meta-item">
            <span>League</span>
            <span>
              <img
                :src="`/leagues/${player.league_id}.png`"
                alt="league"
              >
            </span>
          </p>
          <p class="player__meta-item">
            <span>Team</span>
            <span><img
              :src="player.club_image"
              alt="club"
              style="margin-right: 4px"
            > {{ player.club_name }}</span>
          </p>
          <p class="player__meta-item">
            <span>Position</span>
            <span>{{ player.position }}</span>
          </p>
        </div>

        <div class="player__vote">
          <button
            class="player__vote-down-btn"
            @click="votePlayer('down')"
          >
            <v-icon>mdi-thumb-down</v-icon>
            <span>{{ player.vote_down_count }}</span>
          </button>

          <button
            class="player__vote-up-btn"
            @click="votePlayer('up')"
          >
            <v-icon>mdi-thumb-up</v-icon>
            <span>{{ player.vote_up_count }}</span>
          </button>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  props: {
    player: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      nosImageUrl: process.env.NOS_IMAGE_URL
    };
  },

  methods: {
    ...mapGetters(['getJwt', 'getId']),

    checkIsLoggedIn() {
      if (!this.getJwt()) {
        this.$parent.isRequestLoginPopup = true;
      } else {
        return true;
      }
    },

    async votePlayer(voteAction) {
      if (!this.checkIsLoggedIn()) return;

      try {
        if (!this.player.isVoted) {
          await this.$axios.$put('/api/vote/player', {
            playerId: this.player.id,
            action: voteAction
          });
          this.player[`vote_${voteAction}_count`]++;
          this.player.isVoted = voteAction;
        } else if (this.player.isVoted === voteAction) {
          await this.$axios.$put('/api/vote/player/cancel', {
            playerId: this.player.id,
            action: voteAction
          });
          this.player[`vote_${voteAction}_count`]--;
          this.player.isVoted = null;
        } else {
          alert('Already voted!');
        }
      } catch (err) {
        console.error(err);
        this.$nuxt.error({ statusCode: 500 });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_player.scss";
</style>