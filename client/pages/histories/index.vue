<template>
  <div>
    <div class="histories">
      <v-timeline class="histories__desktop">
        <v-timeline-item
          v-for="(history, index) in histories"
          :key="index"
          :fill-dot="true"
          :right="true"
          :color="'#f4991e'"
          small
          class="histories__item"
          @click.native="selectHistory(history)"
        >
          <template v-slot:opposite>
            <span
              class="histories__period"
              v-text="`${$moment(history.start_date).utc().format('YYYY. MM. DD HH:mm')} ~ ${$moment(history.end_date).utc().format('YYYY. MM. DD HH:mm')}`"
            />
          </template>

          <div class="py-4">
            <ul class="histories__top5Players">
              <li
                v-for="(player, playerIndex) in history.players"
                :key="playerIndex"
              >
                <p>
                  <img
                    class="histories__flag"
                    :src="`/flags/${player.country_code.toLowerCase()}.png`"
                    alt="flag"
                  >
                  {{ player.known_as }}
                </p>

                <span>{{ $moment.unix(player.birthday).format('YYYY. MM. DD') }} |
                  <img
                    class="histories__club"
                    :src="player.club_image"
                    :alt="player.club_team_id"
                  >
                  {{ player.position }}</span>
              </li>
            </ul>
          </div>
        </v-timeline-item>
      </v-timeline>

      <ul class="histories__mobile">
        <li
          v-for="(history, index) in histories"
          :key="index"
          class="history"
        >
          <nuxt-link 
            class="histories__link"
            :to="localePath({
              name: 'history-historyId-player',
              params: {
                historyId: history.id
              }
            })"
          >
            <p class="histories__mobile-period">
              {{ $moment(history.start_date).utc().format('YYYY. MM. DD HH:mm') }} ~ {{ $moment(history.end_date).utc().format('YYYY. MM. DD HH:mm') }}
            </p>

            <ul class="histories__top5Players">
              <li
                v-for="(player, playerIndex) in history.players"
                :key="playerIndex"
              >
                <p>
                  <img
                    class="histories__flag"
                    :src="`/flags/${player.country_code.toLowerCase()}.png`"
                    :alt="player.country_code"
                  >
                  {{ player.known_as }}
                </p>

                <span>{{ $moment.unix(player.birthday).format('YYYY. MM. DD') }} |
                  <img
                    class="histories__club"
                    :src="player.club_image"
                    :alt="player.club_team_id"
                  >
                  {{ player.position }}</span>
              </li>
            </ul>
          </nuxt-link>
        </li>
      </ul>

      <div
        class="histories__load-more"
      >
        <button
          :disabled="histories[histories.length - 1].id === 1"
          class="nos-basic-btn"
          @click="loadMoreHistories"
        >
          <span v-if="histories[histories.length - 1].id === 1">All histories are loaded</span>
          <span v-else>Load More Histories</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'fade',

  async asyncData({ $axios, error }) {
    try {
      const histories = await $axios.$get('/api/histories');
      return { histories };
    } catch (err) {
      console.error(err);
      return error({ statusCode: 500 });
    }
  },

  data() {
    return {
      isMoreHistoriesLoading: false
    };
  },

  methods: {
    selectHistory(history) {
      this.$router.push(
        this.localePath({
          name: 'history-historyId-player',
          params: {
            historyId: history.id
          }
        })
      );
    },

    async loadMoreHistories() {
      if (this.histories[this.histories.length - 1].id === 1) return;
      this.isMoreHistoriesLoading = true;

      try {
        const moreHistories = await this.$axios.$get('/api/histories', {
          params: {
            minId: this.histories[this.histories.length - 1].id
          }
        });

        this.histories = this.histories.concat(moreHistories);
      } catch (err) {
        console.error(err);
        return this.$nuxt.error({ statusCode: 500 });
      } finally {
        this.isMoreHistoriesLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/histories/_style.scss";
</style>