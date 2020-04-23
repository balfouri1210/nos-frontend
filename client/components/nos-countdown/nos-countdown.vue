<template>
  <div
    class="nos-countdown"
    :class="{
      'nos-countdown--lastStage': $store.getters.getAppStatus === 'lastStage',
      'nos-countdown--preseason': $store.getters.getAppStatus === 'preseason'
    }"
  >
    <div
      class="nos-countdown__timer-container"
    >
      <p class="nos-countdown__slot">
        <slot />
      </p>

      <vac
        :end-time="new Date().getTime() + $store.getters.getDurationToEvent"
        @finish="countdownEnd"
      >
        <p
          slot="process"
          slot-scope="{ timeObj }"
          class="nos-countdown__timer"
        >
          {{ `${timeObj.h} : ${timeObj.m} : ${timeObj.s}` }}
        </p>

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