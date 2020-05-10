<template>
  <div
    class="nos-search-modal"
    :class="{'nos-search-modal--preseason': $store.getters.getAppStatus === 'preseason'}"
  >
    <div class="nos-search-modal__inner">
      <validation-observer v-slot="{ handleSubmit }">
        <form
          id="playerSearchForm"
          @submit.prevent="handleSubmit(search)"
        >
          <div class="nos-search-modal__form">
            <nos-input
              type="text"
              :value="searchKeyword"
              :autocomplete="'new-password'"
              :placeholder="'Search'"
              :clearable="true"
              :is-loading="isSearching"
              @input="searchKeyword = $event"
            />
          </div>
        </form>
      </validation-observer>

      <div
        v-if="suggestions.length > 0 && searchKeyword"
        class="nos-search-modal__suggestion"
      >
        <ul>
          <li
            v-for="(item, index) in suggestions"
            :key="index"
          >
            <button @click="selectSearchItem(item)">
              <p class="nos-search-modal__suggestion-name">
                <img
                  :src="item.club_image"
                  alt="club"
                >
                <span>{{ item.known_as }}</span>
              </p>

              <span class="nos-search-modal__suggestion-info">
                {{ $moment.unix(item.birthday).format('YYYY. MM. DD') }}
                <span class="nos-search-modal__suggestion-info-detail"> / {{ item.height }}cm / {{ item.position }}</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import U from '@/lib/util';

export default {
  data() {
    return {
      searchKeyword: null,
      suggestions: [],
      isSearching: false
    };
  },

  watch: {
    searchKeyword: U.debounce(async function() {
      try {
        if (this.searchKeyword && this.searchKeyword.length >= 2) {
          this.isSearching = true;
          this.suggestions = await this.search();
        } else {
          this.suggestions = [];
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isSearching = false;
      }
    }, 400)
  },

  methods: {
    search() {
      return this.$axios.$get(`/api/search/${this.searchKeyword}`) || [];
    },

    selectSearchItem(item) {
      this.$store.commit('player/mutatePlayerId', item.id);
      this.$store.commit('player/mutatePlayerName', item.known_as);
      U.savePlayerInfoToCookie(item.id, item.known_as);
      this.$emit('closeModal');

      // 평상시
      this.$router.push(
        this.localePath({
          name: 'index-player-playerName',
          params: {
            playerName: item.known_as
          }
        })
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>