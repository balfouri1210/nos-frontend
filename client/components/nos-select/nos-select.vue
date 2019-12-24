<template>
  <div class="nos-select">
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
  padding-bottom: 16px;

  select {
    width: 100%;
  }

  &__error-message {
    position: absolute;
    bottom: 0;
    left: 0;
    color: $form-warning-color;
    font-size: 13px;
  }
}
</style>