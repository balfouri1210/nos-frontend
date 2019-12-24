<template>
  <div>
    <h1>This is 907Degrees. by Balfouri</h1>
    <h1>CURRENT STAGE IS <span style="color: orange">'{{ stage }}'</span></h1>
    <nuxt-link
      :to="localePath('signup')"
    >
      GO TO SIGNUP PAGE
    </nuxt-link>

    <div>
      RESULT : {{ result }}
    </div>

    <div>
      {{ $t('greeting') }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      // const result = await $axios.$get('/api/user');
      const result = 'API call test success!';
      return { result };
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
    "greeting": "Localization test - Hi there!"
  },

  "ko": {
    "greeting": "다국어 지원 테스트 - 안녕하세요!"
  }
}
</i18n>