<template>
  <div class="nos-login-modal">
    <validation-observer v-slot="{ handleSubmit }">
      <form
        id="app"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <div>
          <label for="email">Email</label>
          <nos-input
            id="email"
            type="email"
            name="email"
            :rules="'required'"
            :value="userInfo.email"
            @input="userInfo.email = $event"
          />
        </div>

        <div>
          <label for="password">Password</label>
          <nos-input
            id="password"
            type="password"
            name="password"
            :rules="'required|min:6'"
            :value="userInfo.password"
            @input="userInfo.password = $event"
          />
        </div>

        <div>
          <button
            type="submit"
            class="nos-login-modal__submit"
          >
            Submit
          </button>
        </div>
      </form>
    </validation-observer>

    <transition
      name="fade"
    >
      <div
        v-show="errorMessage"
        class="nos-login-modal__error-message"
      >
        <div>
          <i
            class="material-icons nos-login-modal__error-icon"
          >error</i>
          <span>{{ errorMessage }}</span>
        </div>

        <div>
          <button @click="errorMessage = null">
            <i
              class="material-icons"
            >close</i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('auth');
import jwtDecode from 'jwt-decode';
import { TOKEN_EXPIRES } from '@/lib/constants';

export default {
  data() {
    return {
      userInfo: {
        email: null,
        password: null
      },

      errorMessage: null
    };
  },

  methods: {
    ...mapMutations(['mutateJwt', 'mutateId', 'mutateEmail', 'mutateUsername']),

    async onSubmit() {
      try {
        const { data } = await this.$axios.post('/api/auth', {
          ...this.userInfo
        });

        this.mutateJwt(data.token);
        Cookies.set('jwt', data.token, { expires: TOKEN_EXPIRES });

        const decodedJwt = jwtDecode(data.token);
        this.mutateId(decodedJwt.id);
        this.mutateEmail(decodedJwt.email);
        this.mutateUsername(decodedJwt.username);

        this.$emit('closeLoginModal');
      } catch (err) {
        if (err.response) {
          this.errorMessage = this.$t(err.response.data.message.toLowerCase());
        } else {
          this.errorMessage = this.$t('server_error');
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>