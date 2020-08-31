<template>
  <div class="nos-comment-unit-desktop-wrapper">
    <div class="nos-comment-unit">
      <div class="nos-comment-unit__header">
        <p class="nos-comment-unit__header-title">
          <v-icon>mdi-octagram</v-icon>
          New Comments
        </p>

        <div class="nos-comment-unit__more">
          <span>More</span><v-icon>mdi-chevron-right</v-icon>
        </div>
      </div>

      <div class="nos-comment-unit__body">
        <ul>
          <li
            v-for="(newComment, newCommentsIndex) in newComments"
            :key="newCommentsIndex"
            class="nos-comment-unit__comment"
          >
            <div class="nos-comment-unit__meta">
              <div>
                <img
                  :src="newComment.club_image"
                  alt="club emblem"
                >
                <span>{{ newComment.player_name }}</span>
                <span class="nos-comment-unit__created-at">{{ $moment(newComment.created_at).fromNow() }}</span>
              </div>

              <div>
                <span class="nos-comment-unit__statistics">
                  <v-icon>mdi-thumb-up</v-icon>
                  {{ newComment.vote_up_count }}
                </span>
              </div>
            </div>

            <p class="nos-comment-unit__content">
              {{ newComment.content }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="hotComments.length > 0"
      class="nos-comment-unit"
      style="margin-left: 50px"
    >
      <div class="nos-comment-unit__header">
        <p class="nos-comment-unit__header-title">
          <v-icon>mdi-fire</v-icon>
          Hot Comments
        </p>

        <div class="nos-comment-unit__more">
          <span>More</span><v-icon>mdi-chevron-right</v-icon>
        </div>
      </div>

      <div class="nos-comment-unit__body">
        <ul>
          <li
            v-for="(hotComment, hotCommentsIndex) in hotComments"
            :key="hotCommentsIndex"
            class="nos-comment-unit__comment"
          >
            <div class="nos-comment-unit__meta">
              <div>
                <img
                  :src="hotComment.club_image"
                  alt="club emblem"
                >
                <span>{{ hotComment.player_name }}</span>
                <span class="nos-comment-unit__created-at">{{ $moment(hotComment.created_at).fromNow() }}</span>
              </div>

              <div>
                <span class="nos-comment-unit__statistics">
                  <v-icon>mdi-thumb-up</v-icon>
                  {{ hotComment.vote_up_count }}
                </span>
              </div>
            </div>

            <p class="nos-comment-unit__content">
              {{ hotComment.content }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotComments: [],
      newComments: []
    };
  },

  created() {
    this.getComments();
  },

  methods: {
    async getComments() {
      try {
        [this.newComments, this.hotComments] = await Promise.all([
          this.$axios.$get('/api/comments/player', {
            params: {
              sortType: 'date'
            }
          }),

          this.$axios.$get('/api/comments/player', {
            params: {
              sortType: 'vote'
            }
          }),
        ]);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>