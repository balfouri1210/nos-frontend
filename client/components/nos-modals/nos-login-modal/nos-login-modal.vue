<template>
  <div class="nos-login-modal">
    <nos-default-modal>
      <div class="nos-login-modal__content"> 
        <h2>Login</h2>

        <validation-observer v-slot="{ handleSubmit }">
          <form
            id="app"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <div>
              <nos-input
                id="email"
                type="email"
                name="email"
                :rules="'required'"
                :value="userInfo.email"
                :placeholder="'Email'"
                @input="userInfo.email = $event"
              />
            </div>

            <div>
              <nos-input
                id="password"
                type="password"
                name="password"
                :rules="'required'"
                :value="userInfo.password"
                :placeholder="'Pwd'"
                @input="userInfo.password = $event"
              />
            </div>

            <div class="nos-login-modal__submit">
              <button type="submit">
                <v-icon>
                  mdi-arrow-right
                </v-icon>
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

        <div class="nos-login-modal__sub-actions">
          <nuxt-link
            :to="localePath('account-password-reset')"
            class="nos-login-modal__forgot-password"
            @click.native="$emit('close-modal')"
          >
            Forgot Password?
          </nuxt-link>

          <br>

          <nuxt-link
            :to="localePath('signup')"
            class="nos-login-modal__create-account"
            @click.native="$emit('close-modal')"
          >
            Create Account
          </nuxt-link>
        </div>
      </div>
    </nos-default-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('auth');
import jwtDecode from 'jwt-decode';
import { TOKEN_EXPIRES } from '@/lib/constants';
import nosDefaultModal from '../nos-default-modal/nos-default-modal.vue';

export default {
  components: {
    nosDefaultModal
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
    ...mapMutations(['mutateJwt', 'mutateId', 'mutateEmail', 'mutateUsername', 'mutateAuthorization']),

    async onSubmit() {
      try {
        const data = await this.$axios.$post('/api/auth', {
          ...this.userInfo
        });

        this.mutateJwt(data.token);
        this.$cookies.set('nos_jwt', data.token, {
          maxAge: TOKEN_EXPIRES,
          domain: process.env.STAGE === 'local' ? 'localhost' : '.907degrees.com'
        });

        const decodedJwt = jwtDecode(data.token);
        this.mutateId(decodedJwt.id);
        this.mutateEmail(decodedJwt.email);
        this.mutateUsername(decodedJwt.username);
        this.mutateAuthorization(decodedJwt.authorization);

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