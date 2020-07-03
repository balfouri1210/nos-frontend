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
                  A new leaderboard opens at {{ $moment.utc($store.getters.getSeasonStart).format('YYYY. MM. DD HH:mm') }} (UTC).
                  Meanwhile, you can search for players, leave comments, or add reactions.
                </span>
              </v-tooltip>
            </p>
          </div>
        </nos-countdown>
      </client-only>

      <div class="preseason__content">
        <p class="preseason__ment">
          Search players and Show your interest
        </p>

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
                  <p class="nos-search-modal__suggestion-name">
                    <img
                      :src="item.club_image"
                      alt="club"
                    >
                    <span style="max-width: 170px; font-size: 14px">{{ item.known_as }}</span>
                  </p>

                  <span class="nos-search-modal__suggestion-info">
                    <img
                      :src="`${nosImageUrl}/flags/${item.country_code.toLowerCase()}.png`"
                      :alt="item.country_code"
                    >
                    {{ $moment.unix(item.birthday).format('YYYY. MM. DD') }}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <p class="preseason__ment">
          Want to check on the previous leaderboard?
        </p>

        <nuxt-link
          class="preseason__link"
          :to="localePath('histories')"
        >
          Go to Histories
        </nuxt-link>
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
@import "@/components/nos-modals/nos-search-modal/_style.scss";
</style>