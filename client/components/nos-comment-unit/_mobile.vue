<template>
  <div class="nos-comment-unit">
    <div class="nos-comment-unit__header">
      <p>
        <!-- <span v-if="sortType === 'date'">New</span> -->
        Comments
        <!-- <span v-if="sortType === 'vote'">got more than 10 ups</span> -->
      </p>

      <div class="nos-comment-unit__sort-type">
        <button
          class="nos-comment-unit__sort-type-btn"
          :class="{'nos-comment-unit__sort-type-btn--active': sortType === 'date'}"
          @click="getCommentsBySortType('date')"
        >
          <v-icon>mdi-octagram</v-icon>
          <span>New</span>
        </button>

        <button
          class="nos-comment-unit__sort-type-btn"
          :class="{'nos-comment-unit__sort-type-btn--active': sortType === 'vote'}"
          @click="getCommentsBySortType('vote')"
        >
          <v-icon>mdi-fire</v-icon>
          <span>Hot</span>
        </button>
      </div>
    </div>

    <div class="nos-comment-unit__body">
      <ul>
        <li
          v-for="(comment, index) in comments"
          :key="index"
          class="nos-comment-unit__comment"
        >
          <div class="nos-comment-unit__meta">
            <div>
              <img
                :src="comment.club_image"
                alt="club emblem"
              >
              <span>{{ comment.player_name }}</span>
              <span class="nos-comment-unit__created-at">{{ $moment(comment.created_at).fromNow() }}</span>
            </div>

            <div>
              <!-- <span class="nos-comment-unit__statistics">
                <v-icon>mdi-comment-processing-outline</v-icon>
                {{ comment.reply_count }}
              </span> -->

              <span class="nos-comment-unit__statistics">
                <v-icon>mdi-thumb-up</v-icon>
                {{ comment.vote_up_count }}
              </span>
            </div>
          </div>

          <p class="nos-comment-unit__content">
            {{ comment.content }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortType: 'date',
      comments: null
    };
  },

  created() {
    this.getCommentsBySortType(this.sortType);
  },

  methods: {
    async getCommentsBySortType(sortType) {
      try {
        this.sortType = sortType;

        this.comments = await this.$axios.$get('/api/comments/player', {
          params: {
            sortType
          }
        });
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