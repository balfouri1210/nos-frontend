<template>
  <div
    class="nos-search-modal"
    :class="{'nos-search-modal--preseason': $store.getters.getAppStatus === 'preseason'}"
  >
    <div class="nos-search-modal__inner">
      <h2>Club</h2>
      <ul class="nos-search-modal__clubs">
        <li
          v-for="(club, index) in clubs"
          :key="index"
        >
          <button
            class="btn-neumorphism"
            @click="selectClub(club)"
          >
            <img
              :src="club.image"
              :alt="club.name"
            >
            <span>{{ club.clean_name }}</span>
          </button>
        </li>
      </ul>

      <h2>Country</h2>
      <button
        class="nos-search-modal__country flex-basic"
        @click="expendCountryList = !expendCountryList"
      >
        <v-icon>mdi-web</v-icon>
        Select Country
      </button>

      <div
        v-if="expendCountryList"
        class="nos-search-modal__country-list"
      >
        <p>Frequently searched countries</p>
        <div
          class="nos-search-modal__country-group"
          style="border-bottom: 1px solid rgba(0, 0, 0, 0.1)"
        >
          <button
            v-for="(majorCountry, majorIndex) in majorCountries"
            :key="majorIndex"
            class="nos-search-modal__country-selector"
            @click="selectCountry(majorCountry)"
          >
            <img
              :src="`${nosImageUrl}/flags/${majorCountry.code.toLowerCase()}.png`"
              :alt="majorCountry.code"
            >
            <span>{{ majorCountry.name }}</span>
          </button>
        </div>

        <div class="nos-search-modal__country-group">
          <button
            v-for="(country, index) in countries"
            :key="index"
            class="nos-search-modal__country-selector"
            @click="selectCountry(country)"
          >
            <img
              :src="`${nosImageUrl}/flags/${country.code.toLowerCase()}.png`"
              :alt="country.code"
            >
            <span>{{ country.name }}</span>
          </button>
        </div>
      </div>

      <h2>Keyword</h2>
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
                  :src="`${nosImageUrl}/flags/${item.country_code.toLowerCase()}.png`"
                  :alt="item.country_code"
                >
                {{ $moment.unix(item.birthday).format('DD / MM / YYYY') }}
                <span class="nos-search-modal__suggestion-info-detail">, {{ item.height }}cm, {{ item.position }}</span>
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