<template>
  <div
    class="nos-modal nos-notification-modal"
  >
    <div class="nos-notification">
      <nos-modal-header @closeModal="$emit('closeModal')" />

      <div class="nos-modal__body">
        <v-progress-circular
          v-if="!notifications"
          class="centered"
          :size="30"
          :width="3"
          color="rgb(255, 255, 255)"
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
            <button>
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
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "../_modal-common-style.scss";
@import "./_style.scss";
</style>