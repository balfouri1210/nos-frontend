<template>
  <div class="account-delete">
    <v-icon>mdi-human-greeting</v-icon>
    <h1>Your account deleted successfully.</h1>
    <span>Thanks for coming 907degrees and Sorry for not satisfying you. Your account will be logged out automatically.</span>
  </div>
</template>

<script>
export default {
  layout: 'entry'
};
</script>

<style lang="scss" scoped>
.account-delete {
  margin-top: 32px;
  text-align: center;

  h1, span {
    font-weight: 300;
  }

  h1 { margin-bottom: 14px; font-size: 20px; }
  span { display: block; font-size: 15px; }

.v-icon {
    margin-bottom: 16px;
    color: $nos-main-theme;
    font-size: 46px;
  }

  &__link {
    display: inline-block;
    margin-top: 32px;
    padding: 12px 32px;
  }
}
</style>