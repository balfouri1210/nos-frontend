<template>
  <div
    class="nos-input"
    :class="{ 'nos-input--outlined': outlined }"
  >
    <validation-provider
      v-slot="{ errors }"
      :rules="rules"
      :name="name"
      :debounce="debounce"
    >
      <input
        :id="id"
        v-model="inputVal"
        :type="type"
        :required="required"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="disabled"
      >

      <p class="nos-input__error-message">
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

    placeholder: {
      type: String,
      default: null
    },

    type: {
      type: String,
      default: 'text'
    },

    required: {
      type: Boolean,
      default: false
    },

    rules: {
      type: [Object, String],
      default: null
    },

    debounce: {
      type: Number,
      default: 0
    },

    autocomplete: {
      type: String,
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    },

    outlined: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    inputVal: {
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
.nos-input {
  position: relative;
  padding-bottom: 18px;

  input {
    width: 100%;
  }

  &__error-message {
    position: absolute;
    top: 26px;
    left: 0;
    color: $color-warning;
    font-size: 13px;
    line-height: 1.2;
  }

  &--outlined {
    input {
      padding: 0 8px;
      border: 1px solid $nos-main-theme;
      border-radius: 4px;
    }

    input:disabled {
      border: 1px solid black !important;
      background: rgba(0, 0, 0, 0.1);
    }

    .nos-input__error-message {
      top: 42px;
      left: 8px;
      color: #c62828;
    }
  }
}
</style>