<template>
  <div
    class="nos-modal nos-login-modal"
    :class="{'nos-modal--white-tone': $store.getters.getIsModalWhiteTone($route)}"
  >
    <nos-modal-header @closeModal="$emit('closeModal')" />

    <div class="nos-modal__body"> 
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
              :rules="'required'"
              :value="userInfo.password"
              @input="userInfo.password = $event"
            />
          </div>

          <button
            type="submit"
            class="nos-login-modal__submit nos-modal__button"
          >
            Login
          </button>
        </form>
      </validation-observer>

      <transition
        name="fade"
      >
        <div
          v-show="errorMessage"
          class="nos-login-modal__error-message"
        >
          <i
            class="material-icons nos-login-modal__error-icon"
          >error</i>

          <span>{{ errorMessage }}</span>

          <div>
            <button
              class="nos-login-modal__error-close"
              @click="errorMessage = null"
            >
              <i
                class="material-icons"
              >close</i>
            </button>
          </div>
        </div>
      </transition>

      <div>
        <nuxt-link
          :to="localePath('account-password-reset')"
          class="nos-login-modal__forgot-password"
          @click.native="$emit('closeModal')"
        >
          Forgot Password?
        </nuxt-link>

        <nuxt-link
          :to="localePath('signup')"
          class="nos-login-modal__signup"
          @click.native="$emit('closeModal')"
        >
          Signup
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('auth');
import jwtDecode from 'jwt-decode';
import { TOKEN_EXPIRES } from '@/lib/constants';
import nosModalHeader from '../nos-modal-header/nos-modal-header.vue';

export default {
  components: {
    nosModalHeader
  },

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
        const data = await this.$axios.$post('/api/auth', {
          ...this.userInfo
        });

        this.mutateJwt(data.token);
        Cookies.set('nosJwt', data.token, { expires: TOKEN_EXPIRES });

        const decodedJwt = jwtDecode(data.token);
        this.mutateId(decodedJwt.id);
        this.mutateEmail(decodedJwt.email);
        this.mutateUsername(decodedJwt.username);

        gtag('event', 'login', {
          event_category: 'account',
          event_label: 'email'
        });

        this.$emit('loginSuccess');
      } catch (err) {
        if (err.response) {
          switch (err.response.data.code) {
          case 'u003':
            this.errorMessage =
                "The email you entered doesn't belong to an account. Please check your email and try again.";
            break;

          case 'u004':
            this.errorMessage =
                'Sorry, your password was incorrect. Please double-check your password.';
            break;

          case 'u011':
            this.errorMessage =
                'Email verification is required. Please check your inbox.';
            break;

          default:
            this.errorMessage =
                'Sorry, looks like we’re having some issues :( Please try again.';
          }
        } else {
          this.errorMessage =
            'Sorry, looks like we’re having some issues :( Please try again.';
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../_modal-common-style.scss";
@import "./_style.scss";
</style>