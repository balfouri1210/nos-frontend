import countries from '@/lib/countries';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapMutations } = createNamespacedHelpers('auth');
import jwtDecode from 'jwt-decode';
import { TOKEN_EXPIRES } from '@/lib/constants';

export default {
  data() {
    return {
      errors: [],
      countries,

      isUsernameChecking: false,

      isProfileUpdating: false,
      isProfileUpdateCompleted: false,
      isProfileUpdateFailed: false,

      isPasswordUpdating: false,
      isPasswordUpdateCompleted: false,
      isPasswordUpdateFailed: false,

      isDeleteForm: false,
      currentPassword: null,

      isAccountDeleting: false,
      isAccountDeleteFailed: false
    };
  },

  methods: {
    ...mapGetters(['getEmail', 'getUsername']),
    ...mapMutations(['mutateJwt', 'mutateId', 'mutateEmail', 'mutateUsername']),

    async updateProfile() {
      this.initiateUpdateProfileStatus();
      this.isProfileUpdating = true;

      try {
        const result = await this.$axios.$put('/api/users/profile', {
          username: this.userInfo.username,
          countryId: this.userInfo.countryId
        });

        this.isProfileUpdateCompleted = true;
        this.$refs.profileForm.reset();

        this.applyNewJWT(result.newToken);
      } catch (err) {
        if (err.response.status === 400)
          this.isProfileUpdateFailed = true;
      } finally {
        this.isProfileUpdating = false;
      }
    },

    async updatePassword() {
      this.initiateUpdatePasswordStatus();
      this.isPasswordUpdating = true;
      
      try {
        await this.$axios.$put('/api/users/password', {
          oldPassword: this.userInfo.oldPassword,
          newPassword: this.userInfo.newPassword
        });

        this.isPasswordUpdateCompleted = true;
        this.userInfo.oldPassword = null;
        this.userInfo.newPassword = null;
        this.userInfo.confirmNewPassword = null;
        this.$refs.passwordForm.reset();
      } catch (err) {
        if (err.response.status === 400)
          this.isPasswordUpdateFailed = true;
      } finally {
        this.isPasswordUpdating = false;
      }
    },

    initiateUpdateProfileStatus() {
      this.isProfileUpdateCompleted = false;
      this.isProfileUpdateFailed = false;
    },

    initiateUpdatePasswordStatus() {
      this.isPasswordUpdateCompleted = false;
      this.isPasswordUpdateFailed = false;
    },

    applyNewJWT(newToken) {
      this.mutateJwt(newToken);
      this.$cookies.set('nos_jwt', newToken, {
        maxAge: TOKEN_EXPIRES,
        domain: process.env.STAGE === 'local' ? 'localhost' : '.907degrees.com'
      });

      const decodedJwt = jwtDecode(newToken);
      this.mutateId(decodedJwt.id);
      this.mutateEmail(decodedJwt.email);
      this.mutateUsername(decodedJwt.username);
    },

    async deleteAccount() {
      try {
        this.isAccountDeleting = true;
        await this.$axios.$delete('/api/users', {
          params: {
            currentPassword: this.currentPassword
          }
        });

        this.$store.$logout();
        this.$router.push(this.localePath('account-deleted'));
      } catch (err) {
        if (err.response.status === 400)
          this.isAccountDeleteFailed = true;
      } finally {
        this.isAccountDeleting = false;
      }
    }
  }
};
