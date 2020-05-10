<template>
  <div class="player-modal-info">
    <div class="player">
      <div
        class="player__image"
        :style="{
          backgroundImage: `url(${nosImageUrl}/players/david_beckham.jpg), url(${nosImageUrl}/players/default.png)`,
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
            class="player__vote-btn"
            :class="{'player__vote--voted': player.vote === 'up'}"
            :disabled="disabled"
            @click="votePlayer('up')"
          >
            <v-icon>mdi-thumb-up</v-icon>
            <span>{{ player.vote_up_count }}</span>
          </button>

          <button
            class="player__vote-btn"
            :class="{'player__vote--voted': player.vote === 'down'}"
            :disabled="disabled"
            @click="votePlayer('down')"
          >
            <v-icon>mdi-thumb-down</v-icon>
            <span>{{ player.vote_down_count }}</span>
          </button>
        </div>
      </div>
    </div> 

    <div>
      <v-icon>mdi-thumb-up</v-icon>
      <v-icon>mdi-thumb-down</v-icon>
      <v-icon>mdi-help-circle-outline</v-icon>
      <v-icon>mdi-alert-circle-outline</v-icon>
      <v-icon>mdi-fire</v-icon>
      <v-icon>mdi-party-popper</v-icon>
      <v-icon>mdi-skull</v-icon>
      <v-icon>mdi-arm-flex</v-icon>
      <v-icon>mdi-alien</v-icon>
      <v-icon>mdi-battery-high</v-icon>
      <v-icon>mdi-battery-medium</v-icon>
      <v-icon>mdi-battery-low</v-icon>
      <v-icon>mdi-battery-off-outline</v-icon>
      <v-icon>mdi-bomb</v-icon>
      <v-icon>mdi-emoticon-angry-outline</v-icon>
      <v-icon>mdi-emoticon-confused-outline</v-icon>
      <v-icon>mdi-emoticon-cool-outline</v-icon>
      <v-icon>mdi-emoticon-cry-outline</v-icon>
      <v-icon>mdi-emoticon-lol-outline</v-icon>
      <v-icon>mdi-emoticon-poop</v-icon>
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

  mounted() {
    console.log(this.player);
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
        if (this.player.vote) {
          if (this.player.vote === vote) {
            // 투표 취소
            await this.$axios.$delete('/api/vote/player', {
              params: {
                playerId: this.player.id,
                vote
              }
            });

            this.player[`vote_${vote}_count`]--;
            this.player.vote = null;
          } else {
            // 다른 표에 투표
            await this.$axios.$put('/api/vote/player', {
              playerId: this.player.id,
              vote
            });

            this.player[`vote_${this.player.vote}_count`]--;
            this.player[`vote_${vote}_count`]++;
            this.player.vote = vote;
          }
        } else {
          // 일반 투표
          await this.$axios.$put('/api/vote/player', {
            playerId: this.player.id,
            vote
          });

          this.player[`vote_${vote}_count`]++;
          this.player.vote = vote;
        }
      } catch (err) {
        console.error(err);
        return this.$nuxt.error({ statusCode: 500 });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>