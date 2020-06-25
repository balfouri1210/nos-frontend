<template>
  <div
    class="nos-search-modal"
    :class="{'nos-search-modal--preseason': $store.getters.getAppStatus === 'preseason'}"
  >
    <div class="nos-search-modal__inner">
      <ul class="nos-search-modal__clubs">
        <li
          v-for="(club, index) in clubs"
          :key="index"
        >
          <button @click="selectClub(club)">
            <img
              :src="club.image"
              :alt="club.name"
            >
          </button>
        </li>
      </ul>

      <validation-observer v-slot="{ handleSubmit, invalid }">
        <form
          id="playerSearchForm"
          @submit.prevent="handleSubmit(searchPlayerByKeyword)"
        >
          <div class="nos-search-modal__form">
            <nos-input
              type="text"
              :rules="'required|min:3'"
              :value="searchKeyword"
              :autocomplete="'new-password'"
              :placeholder="'Keyword'"
              :clearable="true"
              :is-loading="isSearching"
              :auto-focus="true"
              :is-error-message="false"
              @input="searchKeyword = $event"
            />

            <button
              type="submit"
              class="nos-search-modal__submit nos-modal__button"
              :disabled="invalid"
            >
              Search
            </button>
          </div>
        </form>
      </validation-observer>

      <div
        v-if="suggestions.length > 0"
        class="nos-search-modal__suggestion"
      >
        <ul>
          <li
            v-for="(item, index) in suggestions"
            :key="index"
          >
            <button @click="selectSearchItem(item)">
              <div class="nos-search-modal__suggestion-name">
                <img
                  :src="item.club_image"
                  alt="club"
                >
                <span>{{ item.known_as }}</span>
              </div>

              <span class="nos-search-modal__suggestion-info">
                <img
                  :src="`/flags/${item.country_code.toLowerCase()}.png`"
                  :alt="item.country_code"
                >
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
import Base from './_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>