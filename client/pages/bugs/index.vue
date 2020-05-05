<template>
  <div class="bugs">
    <div class="nos-stamp">
      <div class="nos-stamp__header">
        <v-icon>mdi-alert-circle</v-icon>
        <span>Foul</span>
      </div>

      <div class="bugs__desc">
        <p>Sorry, looks like we’re having some issues. We’re working towards making something better. It won’t be long.</p>
      </div>
    </div>

    <div class="bugs__report">
      <p class="bugs__report-desc">
        Feel free to report a problem with us.<br>It’ll help us improve 907.
      </p>
      <a
        href="mailto:907degrees@gmail.com"
        class="bugs__report-btn"
      >Report a Problem</a>
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
.bugs {
  margin-top: 16px;

  .nos-stamp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid $color-fail;
    border-radius: 6px;
    background: rgba($color-fail, 0.1);

    &__header {
      display: flex;
      align-items: center;
    }

    .v-icon {
      margin-right: 8px;
      font-size: 40px;
      color: $color-fail;
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

.bugs__report {
  margin-top: 16px;

  &-desc {
    font-size: 14px;
  }

  .nos-basic-outlined-btn {
    margin-top: 8px;
  }

  &-btn {
    display: inline-block;
    width: 100%;
    margin-top: 12px;
    padding: 8px 0;
    border: 1px solid $color-fail;
    border-radius: 6px;
    color: $color-fail !important;
    text-align: center;
    transition: all 0.3s ease-out;
  }
  &-btn:hover {
    background: rgba($color-fail, 0.1);
  }
}

@media screen and (min-width: $mobile-width) {
  .bugs {
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