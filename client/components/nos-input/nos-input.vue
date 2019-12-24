<template>
  <div class="nos-input">
    <validation-provider
      v-slot="{ errors }"
      :rules="rules"
      :name="name"
    >
      <input
        :id="id"
        v-model="inputVal"
        :type="type"
        :required="required"
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
  padding-bottom: 16px;

  input {
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