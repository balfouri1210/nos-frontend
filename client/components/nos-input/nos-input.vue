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
        ref="nosInput"
        v-model="inputVal"
        :type="type"
        :required="required"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="disabled"
      >

      <p
        v-if="isErrorMessage"
        class="nos-input__error-message"
      >
        {{ errors[0] }}
      </p>
    </validation-provider>

    <!-- v-if를 쓰지 않은 이유 : v-if로 구현하면 v-click-outside에 걸리기 때문에 -->
    <!-- close버튼을 눌렀을 때 검색어만 지워지는게 아니라 search modal 자체가 사라진다 -->
    <div
      v-show="clearable || isLoading"
      class="nos-input__extra"
    >
      <v-icon
        v-show="inputVal && !isLoading"
        @click="clearInputVal"
      >
        mdi-close
      </v-icon>

      <v-progress-circular
        v-show="isLoading"
        :size="20"
        :width="2"
        :color="progressCircularColor"
        indeterminate
      />
    </div> 
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
    },

    clearable: {
      type: Boolean,
      default: false
    },

    isLoading: {
      type: Boolean,
      default: false
    },

    progressCircularColor: {
      type: String,
      default: '#808080'
    },

    autoFocus: {
      type: Boolean,
      default: false
    },

    isErrorMessage: {
      type: Boolean,
      default: true
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
  },

  mounted() {
    if (this.autoFocus) this.$refs.nosInput.focus();
  },

  methods: {
    clearInputVal() {
      this.inputVal = '';
      this.$refs.nosInput.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.nos-input {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 18px;

  span {
    width: 100%;
  }

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

  &__extra {
    display: flex;
    justify-content: flex-start;
    width: 24px;
    margin-right: 12px;
  }
}
</style>