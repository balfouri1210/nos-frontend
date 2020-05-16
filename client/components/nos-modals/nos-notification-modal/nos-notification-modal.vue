<template>
  <div
    class="nos-modal nos-notification-modal"
    :class="{'nos-modal--white-tone': $store.getters.getIsModalWhiteTone($route)}"
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
            <button
              class="nos-modal__button"
              @click="selectNoti(noti)"
            >
              <p>{{ noti.object_name }}</p>
              <span class="nos-notification__desc">{{ noti.text }}</span>
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