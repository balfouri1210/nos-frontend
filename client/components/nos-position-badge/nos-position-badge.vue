<template>
  <span
    class="nos-position-badge"
    :class="playerPositionClassObj(position)"
  >{{ position }}</span>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: undefined
    }
  },

  computed: {
    playerPositionClassObj() {
      return (position) => {
        switch (position) {
        case 'FW':
          return 'nos-position-badge__fw';
        case 'MF':
          return 'nos-position-badge__mf';
        case 'DF':
          return 'nos-position-badge__df';
        case 'GK':
          return 'nos-position-badge__gk';
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.nos-position-badge {
  display: inline-block;
  margin-right: 6px;
  padding: 0 4px;
  border-radius: 6px;
  font-size: 10px;
  line-height: 11px;
}
.nos-position-badge__fw { border: 1px solid #EB6217; color: #EB6217; }
.nos-position-badge__mf { border: 1px solid #0d8844; color: #0d8844; }
.nos-position-badge__df { border: 1px solid #1976d2; color: #1976d2; }
.nos-position-badge__gk { border: 1px solid black; color: black; }

@media screen and (min-width: 865px) {
  .nos-position-badge {
    padding: 0 6px;
    font-size: 12px;
    line-height: 15px;
  }
}
</style>