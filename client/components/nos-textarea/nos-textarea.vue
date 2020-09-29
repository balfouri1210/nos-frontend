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
        this.$emit('textareaVal', newValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>