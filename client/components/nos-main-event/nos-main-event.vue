<template>
  <div class="main-event">
    <button @click="showDialog = true">
      <span>Send your Feedback 👉</span><span style="margin-left: 6px">Get Amazon Giftcard!</span>
    </button>

    <!-- SHOW ALL OF VOTES -->
    <v-dialog
      v-model="showDialog"
      content-class="main-event__dialog"
      max-width="400px"
    >
      <v-card>
        <v-card-title>Welcome!</v-card-title>
        <v-divider />
        <div class="main-event__desc">
          <img
            src="/amazon-giftcard.png"
            alt="amazon giftcard"
          >

          <p>
            907Degrees is a very early stage website and I've been making this website alone.
            I'd like to communicate with as many users as possible.
            If you like 907Degrees or want to experience a better football community, please send your feedback to
            <a
              href="mailto:support@907degrees.com"
              style="color: #f4991e"
            >support@907degrees.com</a>.
            Any opinions are welcome!
          </p>

          <p>
            I'll give <span style="font-weight: 600">£10 Amazon Giftcard</span> to <span style="font-weight: 600">10 users</span> who have given a great feedback.
          </p>
        </div>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="#f4991e"
            text
            @click="showDialog = false"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>