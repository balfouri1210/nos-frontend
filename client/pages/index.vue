<template>
  <div>
    <h1>This is 907Degrees. by Balfouri</h1>
    <h1>CURRENT STAGE IS <span style="color: orange">'{{ stage }}'</span></h1>

    <nuxt-link
      :to="localePath('signup')"
    >
      GO TO SIGNUP PAGE
    </nuxt-link>

    <div
      v-if="getJwt()"
      style="color: hotpink"
    >
      Hello, {{ getEmail() }}
    </div>

    <div>
      {{ $t('greeting') }}
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  // async asyncData({ $axios }) {
  //   try {
  //     const result = (await $axios.$get('/api/users')) || null;
  //     return { result };
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },

  data() {
    return {
      stage: process.env.STAGE
    };
  },

  methods: {
    ...mapGetters(['getJwt', 'getEmail'])
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