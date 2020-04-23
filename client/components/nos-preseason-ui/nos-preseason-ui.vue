<template>
  <div class="preseason">
    <div class="preseason__wrapper">
      <client-only>
        <nos-countdown @seasonStart="seasonStartHandler">
          <div>
            <p>
              NEW LEADERBOARD
              <v-tooltip
                top
                :max-width="340"
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    :style="{
                      verticalAlign: 'initial'
                    }"
                    ml-2
                    color="white"
                    v-on="on"
                  >
                    mdi-help-circle-outline
                  </v-icon>
                </template>
                <span>
                  New leaderboard will be opened at {{ $moment($store.getters.getSeasonStart).format('YYYY. MM. DD HH:mm') }}.<br>
                  You can search player and leave opinion and vote.
                  907 calculates all the data and give you new leaderboard.
                </span>
              </v-tooltip>
            </p>
          </div>
        </nos-countdown>
      </client-only>

      <div class="preseason__content">
        <div :style="{ position: 'relative' }">
          <validation-observer v-slot="{ handleSubmit }">
            <form
              id="app"
              @submit.prevent="handleSubmit(search)"
            >
              <div class="preseason__search-form">
                <nos-input
                  type="text"
                  :value="searchKeyword"
                  :autocomplete="'new-password'"
                  :placeholder="'Search player'"
                  :clearable="true"
                  :is-loading="isSearching"
                  :progress-circular-color="'white'"
                  @input="searchKeyword = $event"
                />
              </div>
            </form>
          </validation-observer>

          <div
            v-if="suggestions.length > 0 && searchKeyword"
            class="preseason__suggestion"
          >
            <ul>
              <li
                v-for="(item, index) in suggestions"
                :key="index"
              >
                <button @click="selectSearchItem(item)">
                  <img
                    :src="item.club_image"
                    alt="club"
                  >
                  <span>{{ item.known_as }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <p class="preseason__ment">
          Search players and leave a opinion
        </p>
      </div>
    </div>
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