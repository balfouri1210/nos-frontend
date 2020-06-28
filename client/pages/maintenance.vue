<template>
  <div class="maintenance">
    <div class="maintenance__body centered">
      <img
        src="https://images.907degrees.com/logos/logo_white2.svg"
        alt="logo"
      >

      <v-icon>mdi-whistle</v-icon>

      <h2>Sorry, We are down for maintenance & update.</h2>
      <p>We'll be back soon!</p>

      <p class="estimated-time">
        Estimated time: {{ $moment($store.getters.getComebackTime, 'YYYYMMDDHHmm').format('YYYY. MM. DD HH:mm') }} (UTC)
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'clean'
};
</script>

<style lang="scss" scoped>
.maintenance {
  background: $nos-main-gradient;
  height: 100vh;

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    text-align: center;

    img {
      width: 200px;
      margin: 0 auto 32px;
    }

    .v-icon {
      margin-bottom: 16px;
      color: white;
      font-size: 120px;
      transform: rotate(-15deg);
    }

    h2,
    p {
      color: white;
      font-size: 18px;
    }
  }

  .estimated-time {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 300;
  }
}

@media screen and (min-width: $mobile-width) {
  .maintenance {
    &__body {
      .v-icon {
        margin-bottom: 28px;
      }

      h2,
      p {
        font-size: 22px;
      }
    }

    .estimated-time {
      margin-top: 12px;
      font-size: 15px;
    }
  }
}
</style>