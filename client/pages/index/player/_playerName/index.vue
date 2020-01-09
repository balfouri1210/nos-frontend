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
            <ul>
              <li
                v-for="(comment, index) in comments"
                :key="index"
                class="player-modal__comment"
              >
                <span>{{ comment.username }} : {{ comment.content }}</span>

                <div class="player-modal__comment-sub-action">
                  <button @click="voteUp">
                    <i class="material-icon">thumb_up_alt</i>
                    <span>{{ comment.vote_up }}</span>
                  </button>
                  <button @click="voteDown">
                    <i class="material-icon">thumb_down_alt</i>
                    <span>{{ comment.vote_down }}</span>
                  </button>
                  <button @click="comment.isNewReply = !comment.isNewReply">
                    REPLY
                  </button>
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
                    <ul>
                      <li
                        v-for="(reply, replyIndex) in comment.replies"
                        :key="replyIndex"
                        class="player-modal__reply"
                      >
                        <p>
                          {{ reply.username }}: {{ reply.content }}
                        </p>
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