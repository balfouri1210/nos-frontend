<template>
  <div
    class="nos-modal nos-notification-modal"
    :class="{'nos-modal--greyscale': isGreyScale}"
  >
    <div class="nos-notification">
      <nos-modal-header @closeModal="$emit('closeModal')" />

      <div class="nos-modal__body">
        <v-progress-circular
          v-if="!notifications"
          class="centered"
          :size="30"
          :width="3"
          :color="progressCircularColor"
          indeterminate
        />

        <p
          v-if="notifications && notifications.length === 0"
          class="centered nos-notification__empty"
        >
          No notifications yet!
        </p>

        <ul v-if="notifications">
          <li
            v-for="(noti, index) in notifications"
            :key="index"
            class="nos-notification__item"
          >
            <button class="nos-modal__button">
              <span>{{ noti.text }}</span>
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
  mixins: [Base],

  computed: {
    isGreyScale() {
      return (
        this.$store.getters.getAppStatus === 'preseason' &&
        this.$route.name.indexOf('index') !== -1
      );
    },

    progressCircularColor() {
      const result = this.isGreyScale ? '#f4991e' : 'rgb(255, 255, 255)';
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../_modal-common-style.scss";
@import "./_style.scss";
</style>