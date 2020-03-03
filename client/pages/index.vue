<template>
  <div
    id="home"
    class="home"
  >
    <ul
      class="player-list"
    >
      <li
        v-for="(player, index) in playerList"
        :key="index"
        class="player"
      >
        <nuxt-link
          :to="localePath({
            path: `/player/${player.known_as}_${player.id}`
          })"
        >
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
            <p>{{ $moment.unix(player.birthday).format('YYYY. MM. DD') }}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>

    <div
      v-if="isMorePlayersLoading"
      class="home__player-loader"
    >
      <v-progress-circular
        :size="26"
        :width="3"
        color="#f4991e"
        indeterminate
      />
    </div>

    <!-- Nuxt child for player modal -->
    <nuxt-child />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  async asyncData({ $axios, error }) {
    try {
      const playerList = await $axios.$get('/api/players');
      return { playerList };
    } catch (err) {
      console.error(err);
      return error({ statusCode: 500 });
    }
  },

  data() {
    return {
      isMorePlayersLoading: false
    };
  },

  computed: {
    previousPlayerIdList() {
      return this.playerList.map(player => {
        return player.id;
      });
    },

    scrollOffsetToLoadMorePlayer() {
      return window.screen.width < 875 ? 50 : 100;
    }
  },

  mounted() {
    window.addEventListener('scroll', this.detectScroll);
  },

  methods: {
    ...mapGetters(['getJwt', 'getUsername']),

    async loadMorePlayers() {
      if (this.isMorePlayersLoading || this.playerList.length >= 100) return;

      try {
        this.isMorePlayersLoading = true;

        const loadedPlayers = await this.$axios.$get('/api/players', {
          params: {
            previousPlayerIdList: this.previousPlayerIdList
          }
        });

        this.playerList = this.playerList.concat(loadedPlayers);
        if (this.playerList.length > 100) this.cut100PlayerList();
      } catch (err) {
        console.error(err);
        return this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isMorePlayersLoading = false;
      }
    },

    cut100PlayerList() {
      this.playerList = this.playerList.slice(1, 100);
    },

    detectScroll() {
      let bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight >=
        document.getElementById('home').offsetHeight -
          this.scrollOffsetToLoadMorePlayer;

      if (bottomOfWindow) {
        this.loadMorePlayers();
      }
    }
  },

  // Onscroll release
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.detectScroll);
    next();
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>
