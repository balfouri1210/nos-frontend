<template>
  <div class="vote-area">
    <button
      class="vote-area__btn"
      :class="{'vote-area__btn--voted': player.vote === 'up'}"
      :disabled="disabled"
      @click="votePlayer('up')"
    >
      <v-icon>mdi-thumb-up</v-icon>
      <span>{{ player.vote_up_count }}</span>
    </button>

    <button
      class="vote-area__btn"
      :class="{'vote-area__btn--voted': player.vote === 'down'}"
      :disabled="disabled"
      @click="votePlayer('down')"
    >
      <v-icon>mdi-thumb-down</v-icon>
      <span>{{ player.vote_down_count }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style>
</style>