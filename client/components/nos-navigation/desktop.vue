<template>
  <div class="nos-account-menu-modal">
    <nos-default-modal>
      <div class="nos-account-menu-modal__content">
        <div>
          <button
            v-for="(menu, index) in mainMenus.slice(0, 3)"
            :key="index"
            @click="selectMenu(menu)"
          >
            <v-icon>{{ menu.icon }}</v-icon>
            {{ menu.name.toUpperCase() }}
          </button>
        </div>

        <div v-if="getJwt()">
          <button
            v-for="(menu, index) in mainMenus.slice(3, 5)"
            :key="index"
            @click="selectMenu(menu)"
          >
            <v-icon>{{ menu.icon }}</v-icon>
            {{ menu.name.toUpperCase() }}
          </button>
        </div>
      </div>
    </nos-default-modal>
  </div>
</template>

<script>
import Base from './_base';
import nosDefaultModal from '@/components/nos-modals/nos-default-modal/nos-default-modal.vue';
import { mainMenus } from '@/lib/constants';

export default {
  components: {
    nosDefaultModal
  },

  mixins: [Base],

  data() {
    return {
      mainMenus
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/components/nos-modals/_modal-common-style.scss";
@import "./_desktop-style.scss";
</style>