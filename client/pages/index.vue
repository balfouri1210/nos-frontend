<template>
  <div>
    <h1>This is the Front Page. [ CURRENT STAGE IS '{{ stage }}' ]</h1>
    <nuxt-link
      :to="localePath('signup')">
      SIGNUP
    </nuxt-link>

    RESULT : {{ result }}

    <div>
      {{ $t('greeting') }}

      <button
        @click="changeLocale('en')">
        English
      </button>

      <button
        @click="changeLocale('ko')">
        한국어
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      stage: process.env.STAGE
    };
  },

  async asyncData() {
    try {
      const result = await axios.get(process.env.NOS_API_URL);
      return { result: result.data };
    } catch (err) {
      throw err;
    }
  },

  methods: {
    changeLocale(locale) {
      this.$i18n._root._i18n.setLocale(locale);
    }
  }
};
</script>

<i18n>
{
  "en": {
    "greeting": "Hi there!"
  },

  "ko": {
    "greeting": "안녕하세요!"
  }
}
</i18n>