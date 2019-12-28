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
          >
            Submit
          </button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        email: null,
        password: null
      }
    };
  },

  methods: {
    async onSubmit() {
      try {
        // await this.$axios.post('/api/users', {
        //   ...this.userInfo,
        //   birth: this.$moment(this.userInfo.birth).format('YYYYMMDD')
        // });
        // this.$router.push(this.localePath('signup-complete'));
      } catch (err) {
        // console.error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>