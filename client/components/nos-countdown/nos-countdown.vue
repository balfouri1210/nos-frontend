<template>
  <div
    class="nos-countdown"
    :class="{
      'nos-countdown--season': $store.getters.getAppStatus === 'season',
      'nos-countdown--lastStage': $store.getters.getAppStatus === 'lastStage',
      'nos-countdown--preseason': $store.getters.getAppStatus === 'preseason'
    }"
  >
    <div
      class="nos-countdown__timer-container"
    >
      <div class="nos-countdown__slot">
        <slot />
      </div>

      <vac
        :end-time="new Date().getTime() + $store.getters.getDurationToEvent"
        @finish="countdownEnd"
      >
        <div
          slot="process"
          slot-scope="{ timeObj }"
          class="nos-countdown__timer"
        >
          <p v-if="timeObj.d > 0">
            {{ `${timeObj.d}days, ` }}
          </p>
          <p>{{ `${timeObj.h} : ${timeObj.m} : ${timeObj.s}` }}</p>
        </div>

        <p
          slot="finish"
          class="nos-countdown__timer"
        >
          00 : 00 : 00
        </p>
      </vac>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    countdownEnd() {
      if (this.$store.getters.getAppStatus === 'lastStage') {
        this.$emit('seasonEnd');
      } else {
        this.$emit('seasonStart');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>