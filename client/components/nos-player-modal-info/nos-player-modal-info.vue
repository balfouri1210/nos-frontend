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
          <!-- <p class="player__meta-item">
            <span>Degrees</span>
            <span>{{ player.position }}</span>
          </p> -->
        </div>

        <div class="player__vote">
          <button
            class="player__vote-down-btn"
            :disabled="disabled"
            @click="votePlayer('down')"
          >
            <v-icon>mdi-thumb-down</v-icon>
            <span>{{ player.vote_down_count }}</span>
          </button>

          <button
            class="player__vote-up-btn"
            :disabled="disabled"
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
    },

    disabled: {
      type: Boolean,
      default: false
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

    async votePlayer(vote) {
      if (!this.checkIsLoggedIn()) return;
      if (this.$route.name.indexOf('history') !== -1) return;

      try {
        const votePlayerResult = await this.$axios.$put('/api/vote/player', {
          playerId: this.player.id,
          vote
        });

        if (votePlayerResult === 'voted') {
          this.player[`vote_${vote}_count`]++;
        } else {
          this.player[`vote_${vote}_count`]--;
        }
      } catch (err) {
        if (err.response.data.code === 'p010') {
          alert('Already voted!');
        } else {
          console.error(err);
          this.$nuxt.error({ statusCode: 500 });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>