<template>
  <div
    class="nos-history-period"
    :style="{
      position: fixedPosition ? 'fixed' : 'unset'
    }"
  >
    <div class="nos-history-period__content">
      <nuxt-link
        :to="localePath({
          name: goBackRouteName || 'index',
          params: goBackRouteParams 
        })"
      >
        <v-icon>mdi-keyboard-backspace</v-icon>
        <span>{{ goBackWord }}</span>
      </nuxt-link>

      <p v-if="!isEmpty(history)">
        <span style="font-weight: 600">Period : </span>
        {{ $moment(history.start_date).format('YYYY. MM. DD HH:mm') }} ~ {{ $moment(history.end_date).format('YYYY. MM. DD HH:mm') }}
      </p>
    </div>
  </div>
</template>

<script>
import U from '@/lib/util';

export default {
  props: {
    history: {
      type: Object,
      default: () => {}
    },

    goBackWord: {
      type: String,
      default: 'Back'
    },

    goBackRouteName: {
      type: String,
      default: ''
    },

    goBackRouteParams: {
      type: Object,
      default: () => {}
    },

    fixedPosition: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    isEmpty(obj) {
      return U.isEmpty(obj, true);
    }
  }
};
</script>

<style lang="scss" scoped>
.nos-history-period {
  position: fixed;
  top: $mobile-header-height;
  left: 0;
  width: 100%;
  height: 42px;
  padding: 8px;
  background: #d57c59;
  text-align: center;
  font-size: 14px;
  color: white;
  z-index: 50;

  &__content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: $web-body-content-width;
  height: 100%;
  margin: 0 auto;

    a {
      display: flex;
      align-items: center;
      position: absolute;
      top: 1px;
      left: 4px;
      color: white;

      span {
        display: none;
      }
    }

    .v-icon {
      margin-right: 8px;
      color: white;
    }
  }
}

@media screen and (min-width: $mobile-width) {
  .nos-history-period {
    top: $web-header-height;
    height: 52px;

    &__content {
      font-size: 16px;

      a {
        top: 5px;

        span {
          display: inline-block;
        }
      }
    }
  }
}
</style>