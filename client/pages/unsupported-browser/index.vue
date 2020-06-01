<template>
  <div class="unsupported-browser">
    <div
      class="centered"
    >
      <img
        :src="'https://images.907degrees.com/logos/logo2.svg'"
        alt="logo"
        style="display: block; width: 200px; margin: 0 auto 56px"
      >

      <img
        class="unsupported-browser__ie"
        src="logos/internet_explorer.png"
        alt="ie"
      >

      <h1>
        Sorry, Internet explorer is not supported :(<br>
        Please use other browsers.
      </h1>

      <div class="unsupported-browser__others">
        <img
          src="logos/chrome.png"
          alt="chrome"
        >
        <img
          src="logos/safari.png"
          alt="safari"
        >
        <img
          src="logos/firefox.png"
          alt="firefox"
        >
        <img
          src="logos/opera.png"
          alt="opera"
        >
        <img
          src="logos/ms_edge.png"
          alt="edge"
        >
        <img
          src="logos/ms_edge_latest.png"
          alt="edge"
        >
        <img
          src="logos/samsung_internet.png"
          alt="samsung"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'clean'
};
</script>

<style lang="scss" scoped>
.unsupported-browser {
  .centered {
    top: 45%;
    width: 80%;
    text-align: center;
  }

  &__ie {
    width: 70px;
    margin-bottom: 24px;
    filter: grayscale(1);
  }

  h1 {
    font-size: 20px;
    font-weight: 300;
  }

  &__others {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 30px;
      margin: 0 6px;
    }
  }
}
</style>