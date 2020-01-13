<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in line"
        :key="index"
      >
        <v-skeleton-loader
          :transition="'scale-transition'"
          height="50"
          type="list-item-two-line"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    line: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style>
</style>