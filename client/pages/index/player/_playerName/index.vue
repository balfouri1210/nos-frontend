<template>
  <div class="player-modal">
    <div
      class="player-modal__backdrop"
      @click="closeModal"
    >
      <div
        class="player-modal__inner centered"
      >
        <div
          class="player-modal__content"
          @click.stop
        >
          <header class="player-modal__header">
            <nuxt-link :to="localePath('index')">
              <i class="material-icon">arrow_back</i>
              <span>BACK</span>
            </nuxt-link>
          </header>

          <h1>
            {{ $t('greeting') }}: {{ playerName }}
          </h1>

          <!-- Add Comment Area -->
          <div class="player-modal__add-comment">
            <label for="Comment">Add a Comment</label>

            <div class="player-modal__comment-editor">
              <textarea
                id="comment"
                v-model="newCommentContent"
                name="comment"
                cols="30"
                rows="2"
                :rules="'required'"
                maxlength="100"
                :placeholder="`How was ${playerName} this week?`"
              />

              <button
                @click="addComment"
              >
                ADD
              </button>
            </div>
          </div>

          <hr>

          <!-- Comment List Area -->
          <div class="player-modal__comments">
            <nos-skeleton-loader
              v-if="isCommentsLoading"
              :line="4"
            />

            <ul>
              <li
                v-for="(comment, commentIndex) in comments"
                :key="commentIndex"
                class="player-modal__comment"
              >
                <div>
                  <p>{{ comment.username }} : {{ comment.content }}</p>

                  <div class="player-modal__comment-sub-action">
                    <button
                      :class="{'player-modal--is-voted': comment.isVoted === 'up'}"
                      @click="playerOpinionVote(comment, 'up')"
                    >
                      <i class="material-icon">thumb_up_alt</i>
                      <span v-if="comment.vote_up_count > 0">{{ comment.vote_up_count }}</span>
                    </button>
                    <button
                      :class="{'player-modal--is-voted': comment.isVoted === 'down'}"
                      @click="playerOpinionVote(comment, 'down')"
                    >
                      <i class="material-icon">thumb_down_alt</i>
                      <span v-if="comment.vote_down_count > 0">{{ comment.vote_down_count }}</span>
                    </button>
                    <button @click="comment.isNewReply = !comment.isNewReply">
                      REPLY
                    </button>
                  </div>
                </div>


                <!-- Add new reply -->
                <div
                  v-if="comment.isNewReply"
                  class="player-modal__add-reply"
                >
                  <div class="player-modal__reply-editor">
                    <input
                      id="comment"
                      v-model="comment.replyContent"
                      type="text"
                      name="comment"
                      :rules="'required'"
                      maxlength="100"
                    >

                    <div class="player-modal__reply-action">
                      <button
                        class="nos-simple-white-btn"
                        @click="cancelReply(comment)"
                      >
                        CANCEL
                      </button>

                      <button
                        class="nos-simple-black-btn"
                        :disabled="!comment.replyContent.trim()"
                        @click="addReply(comment)"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>

                <div class="player-modal__load-reply">
                  <button
                    v-if="comment.reply_count && !comment.isReply"
                    @click="loadReplies(comment)"
                  >
                    <i class="material-icon">keyboard_arrow_down</i>
                    Load {{ comment.reply_count }} replies
                  </button>

                  <button
                    v-if="comment.isReply"
                    @click="comment.isReply = false"
                  >
                    <i class="material-icon">keyboard_arrow_up</i>
                    Hide replies
                  </button>
                </div>
                
                <!-- Replies Area -->
                <div class="player-modal__replies">
                  <div
                    v-if="comment.isReply"
                  >
                    <nos-skeleton-loader
                      v-if="comment.isRepliesLoading"
                      :line="2"
                    />

                    <ul>
                      <li
                        v-for="(reply, replyIndex) in comment.replies"
                        :key="replyIndex"
                        class="player-modal__reply"
                      >
                        <p>{{ reply.username }}: {{ reply.content }}</p>

                        <div class="player-modal__comment-sub-action">
                          <button
                            :class="{'player-modal--is-voted': reply.isVoted === 'up'}"
                            @click="playerOpinionVote(reply, 'up')"
                          >
                            <i class="material-icon">thumb_up_alt</i>
                            <span v-if="reply.vote_up_count > 0">{{ reply.vote_up_count }}</span>
                          </button>
                          <button
                            :class="{'player-modal--is-voted': reply.isVoted === 'down'}"
                            @click="playerOpinionVote(reply, 'down')"
                          >
                            <i class="material-icon">thumb_down_alt</i>
                            <span v-if="reply.vote_down_count > 0">{{ reply.vote_down_count }}</span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div
                    v-if="comment.addedReply && !comment.isReply"
                    class="player-modal__added-reply"
                  >
                    <p>
                      {{ comment.addedReply.username }}: {{ comment.addedReply.content }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Base from './_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import "./_style.scss";
</style>

<i18n>
{
  "en": {
    "greeting": "Player Modal Component"
  },

  "ko": {
    "greeting": "Player 모달 컴포넌트"
  }
}
</i18n>