<template>
  <div>
    <h1>This is the Front Page. [ CURRENT STAGE IS '{{ stage }}' ]</h1>
    <nuxt-link
    :to="{
      name: 'signup'
    }">SIGNUP</nuxt-link>

    {{ result }}

    <h3>Random dog of the day:</h3>
    <img :src='dog.url' alt=''>
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
    const { data } = await axios.get(
      'https://api.thedogapi.com/v1/images/search?limit=1'
    );

    const result = await axios.get(process.env.NOS_API_URL);

    return { dog: data[0], result: result.data };
  }
};
</script>