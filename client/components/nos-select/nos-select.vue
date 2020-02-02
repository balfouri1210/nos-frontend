<template>
  <div
    class="nos-select"
    :class="{ 'nos-select--outlined': outlined }"
  >
    <validation-provider
      v-slot="{ errors }"
      :rules="rules"
      :name="name"
    >
      <select
        :id="id"
        v-model="selectVal"
        :required="required"
      >
        <option
          :value="null"
          disabled
        >
          Select {{ name }}
        </option>

        <option
          v-for="(option, index) in options"
          :key="`option-${index}`"
          :value="option.id || option"
        >
          {{ option.name || option }}
        </option>
      </select>

      <p
        class="nos-select__error-message"
      >
        {{ errors[0] }}
      </p>
    </validation-provider>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: null
    },

    value: {
      type: undefined,
      default: null
    },

    name: {
      type: String,
      default: null
    },

    required: {
      type: Boolean,
      default: false
    },

    options: {
      type: Array,
      default: () => []
    },

    rules: {
      type: [Object, String],
      default: null
    },

    outlined: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    selectVal: {
      get() {
        return this.value;
      },

      set(newValue) {
        this.$emit('input', newValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nos-select {
  position: relative;
  padding-bottom: 18px;

  select {
    width: 100%;
  }

  &__error-message {
    position: absolute;
    bottom: 0;
    left: 0;
    color: $color-warning;
    font-size: 13px;
  }

  &--outlined {
    select {
      padding: 0 8px;
      border: 1px solid $nos-main-theme;
      border-radius: 4px;
    }

    select:disabled {
      border: 1px solid black !important;
      background: rgba(0, 0, 0, 0.1);
    }

    .nos-select__error-message {
      top: 42px;
      left: 8px;
      color: #c62828;
    }
  }
}
</style>