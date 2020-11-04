<template>
  <div class="nos-notification-modal">
    <nos-default-modal>
      <div class="nos-notification-modal__content">
        <v-progress-circular
          v-if="!notifications"
          class="centered"
          :size="30"
          :width="2"
          :color="'#404040'"
          indeterminate
        />

        <p
          v-if="notifications && notifications.length === 0"
          class="centered nos-notification-modal__empty"
        >
          No notifications yet!
        </p>

        <ul v-if="notifications">
          <li
            v-for="(noti, index) in notifications"
            :key="index"
            class="nos-notification-modal__item"
          >
            <button
              class="nos-modal__button"
              @click="selectNoti(noti)"
            >
              <p>{{ noti.object_name }}</p>
              <span class="nos-notification-modal__desc">{{ noti.text }}</span>
            </button>
          </li>
        </ul>
      </div>
    </nos-default-modal>
  </div>
</template>

<script>
import nosDefaultModal from '../nos-default-modal/nos-default-modal.vue';
import Base from './_base';

export default {
  components: {
    nosDefaultModal
  },

  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "../_modal-common-style.scss";
@import "./_style.scss";
</style>