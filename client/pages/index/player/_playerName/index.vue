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
                :disabled="!newCommentContent.trim()"
                @click="addComment"
              >
                ADD
              </button>
            </div>
          </div>

          <hr>

          <!-- Comment List Area -->
          <pulse-loader
            v-if="isCommentAdding"
            :color="'#808080'"
            :size="'6px'"
            :style="{ 'margin': '16px 0' }"
          />

          <div class="player-modal__comments">
            <ul>
              <li
                v-for="(comment, commentIndex) in comments"
                :key="commentIndex"
                class="player-modal__comment"
              >
                <div>
                  <div class="player-modal__comment-meta">
                    <div>
                      <span class="player-modal__comment-username">{{ comment.username }}</span>
                      <span class="player-modal__comment-moment">{{ $moment(comment.created_at).fromNow() }}</span>
                    </div>

                    <!-- Comment more menu -->
                    <v-menu
                      :content-class="'player-modal__more-menu'"
                      transition="slide-y-transition"
                      bottom
                      left
                      :offset-y="true"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          text
                          icon
                          v-on="on"
                        >
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>

                      <v-list v-if="comment.users_id === getId()">
                        <v-list-item @click="editComment(comment)">
                          <v-list-item-title>
                            <v-icon>mdi-pencil</v-icon>Edit
                          </v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="deleteComment(comment)">
                          <v-list-item-title>
                            <v-icon>mdi-delete</v-icon>Delete
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>

                      <v-list v-else>
                        <v-list-item @click="reportComment(comment)">
                          <v-list-item-title>
                            <v-icon>mdi-alert</v-icon>Report
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>

                  <!-- Comment content -->
                  <div>
                    <p
                      v-if="!comment.isEditing"
                      class="player-modal__comment-content"
                    >
                      {{ comment.content }}
                    </p>

                    <div
                      v-else
                      class="player-modal__edit-comment"
                    >
                      <input
                        id="comment"
                        v-model="comment.content"
                        type="text"
                        name="edit-comment"
                        :rules="'required'"
                        maxlength="100"
                      >

                      <div class="player-modal__edit-comment-action">
                        <button
                          class="nos-simple-white-btn"
                          @click="cancelEditComment(comment)"
                        >
                          CANCEL
                        </button>

                        <button
                          class="nos-simple-black-btn"
                          :disabled="!comment.content.trim()"
                          @click="saveEditComment(comment)"
                        >
                          <pulse-loader
                            v-if="comment.isEditCommentSaving"
                            :color="'white'"
                            :size="'4px'"
                          />
                          <span v-else>SAVE</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Comment sub action -->
                  <div class="player-modal__comment-sub-action">
                    <button
                      :class="{'player-modal--is-voted': comment.isVoted === 'up'}"
                      @click="playerOpinionVote(comment, 'up')"
                    >
                      <v-icon>mdi-thumb-up</v-icon>
                      <span v-if="comment.vote_up_count > 0">{{ comment.vote_up_count }}</span>
                    </button>
                    <button
                      :class="{'player-modal--is-voted': comment.isVoted === 'down'}"
                      @click="playerOpinionVote(comment, 'down')"
                    >
                      <v-icon>mdi-thumb-down</v-icon>
                      <span v-if="comment.vote_down_count > 0">{{ comment.vote_down_count }}</span>
                    </button>
                    <!-- <button>REPLY</button> -->
                    <v-btn
                      x-small
                      text
                      @click="comment.isNewReply = !comment.isNewReply"
                    >
                      REPLY
                    </v-btn>
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
                        <pulse-loader
                          v-if="comment.isReplySaving"
                          :color="'white'"
                          :size="'4px'"
                        />
                        <span v-else>ADD</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Load replies -->
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
                      :line="replyCountForSkeletonLoader(comment.reply_count)"
                    />

                    <ul>
                      <li
                        v-for="(reply, replyIndex) in comment.replies"
                        :key="replyIndex"
                        class="player-modal__reply"
                      >
                        <p>
                          <span class="player-modal__reply-username">{{ reply.username }}</span>
                          <span class="player-modal__reply-content">{{ reply.content }}</span>
                        </p>

                        <div class="player-modal__comment-sub-action">
                          <button
                            :class="{'player-modal--is-voted': reply.isVoted === 'up'}"
                            @click="playerOpinionVote(reply, 'up')"
                          >
                            <v-icon>mdi-thumb-up</v-icon>
                            <span v-if="reply.vote_up_count > 0">{{ reply.vote_up_count }}</span>
                          </button>
                          <button
                            :class="{'player-modal--is-voted': reply.isVoted === 'down'}"
                            @click="playerOpinionVote(reply, 'down')"
                          >
                            <v-icon>mdi-thumb-down</v-icon>
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
                      <span class="player-modal__reply-username">{{ comment.addedReply.username }}</span>
                      <span class="player-modal__reply-content">{{ comment.addedReply.content }}</span>
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