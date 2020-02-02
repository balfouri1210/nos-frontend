<template>
  <div class="account-delete">
    <v-icon>mdi-human-greeting</v-icon>
    <p>Your account deleted successfully. Thanks for coming 907degrees and Sorry for not satisfying you.</p>
    <p>Your account will be logged out automatically.</p>
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