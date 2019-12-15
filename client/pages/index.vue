<template>
  <div>
    <h1>This is the Front Page. [ CURRENT STAGE IS '{{ stage }}' ]</h1>
    <nuxt-link
      :to="localePath('signup')"
    >
      SIGNUP
    </nuxt-link>

    RESULT : {{ result }}

    <div>
      {{ $t('greeting') }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData() {
    try {
      const result = await axios.get(process.env.NOS_API_URL);
      return { result: result.data };
    } catch (err) {
      console.error(err);
    }
  },

  data() {
    return {
      stage: process.env.STAGE
    };
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