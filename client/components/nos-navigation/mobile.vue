<template>
  <div class="nos-navigation-mobile">
    <v-navigation-drawer
      v-model="isOpen"
      absolute
      right
      temporary
      class="navigation-drawer"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item
            v-for="(menu, index) in mainMenus.slice(0, 3)"
            :key="index"
            :color="'#f4991e'"
          >
            <v-list-item-title @click="selectMenu(menu)">
              <v-icon>{{ menu.icon }}</v-icon>
              {{ menu.name.toUpperCase() }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item
            v-for="(menu, index) in mainMenus.slice(3, 5)"
            :key="index"
            :color="'#f4991e'"
          >
            <v-list-item-title @click="selectMenu(menu)">
              <v-icon>{{ menu.icon }}</v-icon>
              {{ menu.name.toUpperCase() }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Base from './_base';
import { mainMenus } from '@/lib/constants';

export default {
  mixins: [Base],

  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      mainMenus
    };
  },

  watch: {
    isOpen() {
      if (!this.isOpen) this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_mobile-style.scss';
</style>