<template>
  <div class="nos-skeleton-loader">
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

<style lang="scss" scoped>
.nos-skeleton-loader {
  padding-right: 16px;

  ul {
    margin: 0;
    padding: 0;
    list-style: unset;
  }

  ::v-deep .v-skeleton-loader__list-item-two-line {
    height: unset;
    padding: 0;
    background: transparent;
  }
}
</style>