<template>
  <div
    class="nos-stamp"
    :class="{
      'nos-stamp--success': type === 'success',
      'nos-stamp--failed': type === 'failed'
    }"
  >
    <v-icon v-if="type === 'success'">
      mdi-checkbox-marked-circle-outline
    </v-icon>
    <v-icon v-if="type === 'failed'">
      mdi-alert-circle
    </v-icon>
    <slot />  
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success'
    }
  }
};
</script>

<style lang="scss" scoped>
.nos-stamp {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 6px;

  .v-icon {
    margin-right: 16px;
    font-size: 36px;
  }

  &--success {
    border: 1px solid $nos-main-theme;
    background: rgba($nos-main-theme, 0.1);

    .v-icon {
      color: $nos-main-theme;
    }
  }

  &--failed {
    border: 1px solid $color-fail;
    background: rgba($color-fail, 0.1);

    .v-icon {
      color: $color-fail;
    }
  }
}
</style>