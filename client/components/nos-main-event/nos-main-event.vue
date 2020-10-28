<template>
  <div class="main-event">
    <button
      @click="showDialog = true"
    >
      <p>Waiting for your feedback!</p>
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
          <p>
            907Degrees has just been released and I've been making this space alone.
            I'd like to communicate with as many users as possible.
            If you like 907Degrees or want to experience better football community, please consider sending a feedback to
            <a
              href="mailto:support@907degrees.com"
              style="color: #f4991e"
            >support@907degrees.com</a>.
          </p>

          <p>
            I'll give a special badge
            <span class="main-event__user-badge">1°c</span>
            to those who have given a great feedback.
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