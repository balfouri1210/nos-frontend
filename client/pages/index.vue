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

      <nuxt-link
        :to="switchLocalePath('en')"
      >
        English
      </nuxt-link>

      <nuxt-link
        :to="switchLocalePath('ko')"
      >
        한국어
      </nuxt-link>
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