<template>
  <div class="player-modal">
    <div
      class="player-modal__backdrop"
      @click="closeModal"
    >
      <div
        class="player-modal__close-btn"
        @click.stop
      >
        <button @click="closeModal">
          <span />
        </button>
      </div>
    </div>

    <div class="player-modal__inner">
      <div
        class="player-modal__content-container"
        @click.stop
      >
        <div class="player-modal__content">
          <div class="player-modal__left">
            <header class="player-modal__header">
              <button @click="closeModal">
                <v-icon>mdi-arrow-left</v-icon>
                <span>Leaderboard</span>
              </button>

              <nos-link-share
                :share-url="`${nosUrl}${$route.fullPath}`"
                :font-size="12"
                :data="playerHistory"
              />
            </header>

            <nos-player-modal-info
              :player="playerHistory"
              :disabled="true"
              :is-historical="true"
              :history="history"
            />

            <!-- Comment Sorting -->
            <div class="comment">
              <p class="player-modal__comment-title">
                Comments
              </p>

              <div
                v-if="comments.length"
                class="player-modal__comment-option"
              >
                <div class="player-modal__comment-count">
                  <v-icon>mdi-message-reply-text</v-icon>
                  <span>{{ playerHistory.comment_count }}</span>
                </div>

                <div class="player-modal__comment-sortby">
                  <button
                    class="player-modal__comment-sortby-btn"
                    :class="{'player-modal__comment-sortby-btn--active': commentSortType === 'like'}"
                    @click="sortCommentBy('like')"
                  >
                    <v-icon>mdi-thumbs-up-down</v-icon>
                    <span>Like</span>
                  </button>

                  <button
                    class="player-modal__comment-sortby-btn"
                    :class="{'player-modal__comment-sortby-btn--active': commentSortType === 'date'}"
                    @click="sortCommentBy('date')"
                  >
                    <v-icon>mdi-octagram</v-icon>
                    <span>New</span>
                  </button>
                </div>
              </div>

              <!-- COMMENT LIST AREA -->
              <div
                class="player-modal__comments"
                :class="{'player-modal__comments--changing': isCommentsLoading}"
              >
                <!-- NO COMMENT UI -->
                <div
                  v-if="!comments.length && !isCommentsLoading"
                  class="player-modal__no-comments"
                >
                  <p class="player-modal__no-comments-header centered">
                    <v-icon>mdi-comment-processing-outline</v-icon>
                    <span>No comments during this period</span>
                  </p>
                </div>

                <!-- ACTUAL COMMENTS -->
                <div v-else>
                  <pulse-loader
                    v-if="!comments.length && isCommentsLoading"
                    class="centered"
                    :color="'#808080'"
                    :size="'6px'"
                    :style="{ 'margin': '16px' }"
                  />

                  <ul>
                    <li
                      v-for="(comment, commentIndex) in comments"
                      :key="commentIndex"
                      class="player-modal__comment"
                      :class="{'hot-comment': comment.vote_up_count >= 5}"
                    >
                      <div
                        v-if="comment.vote_up_count >= 5"
                        class="hot-comment__mark"
                      >
                        <v-icon>
                          mdi-fire
                        </v-icon>
                      </div>

                      <div>
                        <div class="player-modal__comment-meta">
                          <span class="player-modal__comment-username">{{ comment.fake_username || comment.username }}</span>
                          <span class="player-modal__comment-moment">{{ $moment(comment.created_at).fromNow() }}</span>
                        </div>

                        <!-- Comment content -->
                        <div>
                          <div
                            v-if="!comment.isEditing"
                            class="player-modal__comment-body"
                          >
                            <p
                              class="player-modal__comment-content"
                              :class="{ 'player-modal__comment-content--expanded': comment.expanded }"
                              v-html="$options.filters.commentFormatter(comment.content)"
                            />

                            <!-- Link Preview -->
                            <nos-link-preview
                              v-if="comment.embedLink"
                              style="margin: 8px 0 10px 0;"
                              :embed-link="comment.embedLink"
                            />
                          </div>
                        </div>

                        <div
                          v-if="comment.needReadMore"
                          class="player-modal__comment-read-more"
                        >
                          <button @click="comment.expanded = !comment.expanded">
                            <span v-if="!comment.expanded">Read more</span>
                            <span v-else>Show less</span>
                          </button>
                        </div>

                        <!-- Comment sub action -->
                        <div class="player-modal__comment-sub-action">
                          <button
                            :class="{'player-modal--is-voted': comment.isVoted === 'up'}"
                            style="cursor: default"
                          >
                            <v-icon>mdi-thumb-up</v-icon>
                            <span v-if="comment.vote_up_count > 0">{{ comment.vote_up_count }}</span>
                          </button>

                          <button
                            :class="{'player-modal--is-voted': comment.isVoted === 'down'}"
                            style="cursor: default"
                          >
                            <v-icon>mdi-thumb-down</v-icon>
                            <span v-if="comment.vote_down_count > 0">{{ comment.vote_down_count }}</span>
                          </button>
                        </div>
                      </div>


                      <!-- Load replies -->
                      <div
                        v-if="comment.reply_count"
                        class="player-modal__load-reply"
                      >
                        <button
                          v-if="!comment.isReply"
                          @click="getReplies(comment)"
                        >
                          <i class="material-icon">keyboard_arrow_down</i>
                          Load {{ comment.reply_count }} Replies
                        </button>

                        <button
                          v-if="comment.isReply"
                          @click="comment.isReply = false"
                        >
                          <i class="material-icon">keyboard_arrow_up</i>
                          Hide Replies
                        </button>
                      </div>


                      <!-- REPLIES AREA -->
                      <div class="player-modal__replies">
                        <div
                          v-if="comment.isReply"
                        >
                          <nos-skeleton-loader
                            v-if="!comment.isRepliesLoaded"
                            :line="comment.reply_count < 5 ? comment.reply_count : 5"
                          />

                          <ul>
                            <li
                              v-for="(reply, replyIndex) in comment.replies"
                              :key="replyIndex"
                              class="player-modal__reply"
                            >
                              <div class="player-modal__reply-meta">
                                <span class="player-modal__reply-username">{{ reply.username }}</span>
                                <span class="player-modal__reply-moment">{{ $moment(reply.created_at).fromNow() }}</span>
                              </div>

                              <div class="player-modal__reply-body">
                                <p class="player-modal__reply-content">
                                  {{ reply.content }}
                                </p>
                              </div>

                              <div class="player-modal__reply-sub-action">
                                <button
                                  :class="{'player-modal--is-voted': reply.isVoted === 'up'}"
                                  style="cursor: default"
                                >
                                  <v-icon>mdi-thumb-up</v-icon>
                                  <span v-if="reply.vote_up_count > 0">{{ reply.vote_up_count }}</span>
                                </button>
                                <button
                                  :class="{'player-modal--is-voted': reply.isVoted === 'down'}"
                                  style="cursor: default"
                                >
                                  <v-icon>mdi-thumb-down</v-icon>
                                  <span v-if="reply.vote_down_count > 0">{{ reply.vote_down_count }}</span>
                                </button>
                              </div>
                            </li>
                          </ul>

                          <button
                            v-if="isReadyForMoreRepliesButton(comment)"
                            class="player-modal__more-replies-btn"
                            @click="loadMoreReplies(comment)"
                          >
                            <v-icon>mdi-chat-processing</v-icon>
                            <span>More Replies</span>
                          </button>

                          <pulse-loader
                            v-if="comment.isMoreRepliesLoading"
                            :color="'#808080'"
                            :size="'4px'"
                            :style="{ 'margin': '16px 0' }"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div
                  v-if="comments.length && (playerHistory.comment_count > comments.length)"
                  class="player-modal__more-comment-btn"
                >
                  <button
                    @click="loadMoreComments"
                  >
                    <pulse-loader
                      v-if="isMoreCommentsLoading"
                      :color="'#808080'"
                      :size="'6px'"
                    />

                    <span v-else>Load More Comments</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="player-modal__right">
            <nos-news-area
              :news-keyword="$route.params.playerName"
            />
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
@import "@/components/nos-player-modal/_style.scss";
@import "@/components/nos-player-modal/_comment-style.scss";
@import "@/components/nos-player-modal/_reply-style.scss";
</style>