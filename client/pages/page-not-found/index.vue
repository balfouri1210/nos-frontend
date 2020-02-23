<template>
  <div class="page-not-found">
    <div class="nos-stamp">
      <div class="nos-stamp__header">
        <v-icon>mdi-help-circle-outline</v-icon>
        <span>Unknown path!</span>
      </div>

      <div class="page-not-found__desc">
        <p>We can’t seem to find the page you’re looking for. Please double check the URL and try agian.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'fade',
  layout: 'entry'
};
</script>

<style lang="scss" scoped>
.page-not-found {
  margin-top: 16px;

  .nos-stamp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid $nos-main-theme;
    border-radius: 6px;
    background: rgba($nos-main-theme, 0.1);

    &__header {
      display: flex;
      align-items: center;
    }

    .v-icon {
      margin-right: 8px;
      font-size: 40px;
      color: $nos-main-theme;
    }

    span {
      font-size: 20px;
    }
  }

  &__desc {
    margin-top: 12px;
    font-size: 14px;
    text-align: center;
  }
}

@media screen and (min-width: $mobile-width) {
  .page-not-found {
    .nos-stamp {
      padding: 24px;

      span {
        font-size: 22px;
      }
    }

    &__desc {
      margin-top: 16px;
      font-size: 16px;
    }
  }
}
</style>