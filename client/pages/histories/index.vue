<template>
  <div>
    <div class="histories">
      <ul>
        <li
          v-for="(history, index) in histories"
          :key="index"
          class="history"
        >
          <nuxt-link 
            class="histories__link"
            :to="localePath({
              name: 'history-historyId-player',
              params: {
                historyId: history.id
              }
            })"
          >
            {{ $moment(history.start_date).utc().format('YYYY. MM. DD HH:mm') }} ~ {{ $moment(history.end_date).utc().format('YYYY. MM. DD HH:mm') }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'fade',

  async asyncData({ $axios, error }) {
    try {
      const histories = await $axios.$get('/api/histories');
      return { histories };
    } catch (err) {
      console.error(err);
      return error({ statusCode: 500 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/page-resources/histories/_style.scss";
</style>