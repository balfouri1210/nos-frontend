<template>
  <div
    class="nos-textarea"
    :class="{ 'nos-textarea--outlined': outlined, 'nos-textarea--extra-padding': errorMessage }"
  >
    <validation-provider
      v-slot="{ errors }"
      :rules="rules"
      :name="name"
      :debounce="debounce"
      :style="'width: 100%'"
    >
      <div style="display: flex">
        <textarea
          :id="id"
          ref="nosTextarea"
          v-model="textareaVal"
          :required="required"
          :placeholder="placeholder"
          :disabled="disabled"
          :maxlength="maxLength > 0 ? maxLength : false"
        />

        <span
          v-if="maxLength > 0"
          class="nos-textarea__char-counter"
          :style="errors.length > 0 ? { color: 'red' } : {}"
        >
          {{ textareaVal.length }} / {{ maxLength }}
        </span>
      </div>

      <p
        v-if="errorMessage"
        class="nos-textarea__error-message"
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
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: null
    },

    placeholder: {
      type: String,
      default: null
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

    disabled: {
      type: Boolean,
      default: false
    },

    outlined: {
      type: Boolean,
      default: false
    },

    maxLength: {
      type: Number,
      default: 0
    },

    errorMessage: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    textareaVal: {
      get() {
        return this.value || '';
      },

      set(newValue) {
        this.$emit('textarea', newValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nos-textarea {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  textarea {
    width: 100%;
    padding: 4px 8px;
  }

  &__error-message {
    position: absolute;
    bottom: 0;
    left: 8px;
    color: $color-warning;
    font-size: 10px;
    font-weight: 300;
    line-height: 1.2;
  }

  &--outlined {
    textarea {
      border: 1px solid $nos-main-theme;
    }

    textarea:disabled {
      border: 1px solid black !important;
      background: rgba(0, 0, 0, 0.1);
    }

    .nos-textarea__error-message {
      top: 42px;
      left: 8px;
      color: #c62828;
    }
  }
  &--extra-padding {
    padding-bottom: 18px;
  }

  &__char-counter {
    position: absolute;
    bottom: 2px;
    right: 6px;
    font-size: 10px;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.5);
  }
}

@media screen and (min-width: $mobile-width) {
  .nos-textarea {
    textarea {
      padding: 6px 10px;
    }

    &__char-counter {
      bottom: 3px;
      right: 8px;
    }
  }
}
</style>