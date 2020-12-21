<template>
  <ul class="nos-clubs">
    <li
      v-for="(club, index) in clubs"
      :key="index"
    >
      <button
        class="btn-neumorphism"
        :class="{'nos-clubs--selected': club.id === selectedClubId}"
        @click="$emit('select-club', club)"
      >
        <img
          :src="club.image"
          :alt="club.name"
        >
        <span>{{ club.clean_name }}</span>
      </button>
    </li>
  </ul>
</template>

<script>
import { eplClubs } from '@/lib/constants';

export default {
  props: {
    selectedClubId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      clubs: eplClubs
    };
  }
};
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>