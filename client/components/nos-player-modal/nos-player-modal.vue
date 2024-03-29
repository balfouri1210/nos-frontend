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

    <div
      class="player-modal__inner"
    >
      <div
        class="player-modal__content-container"
        @click.stop
      >
        <div class="player-modal__content">
          <div class="player-modal__left">
            <header class="player-modal__header">
              <button @click="closeModal">
                <v-icon>mdi-arrow-left</v-icon>
                <span v-if="$route.name.indexOf('search') !== -1">Search</span>
                <span v-else-if="$route.name.indexOf('comment') !== -1">Comments</span>
                <span v-else>Leaderboard</span>
              </button>

              <nos-link-share
                :link="linkToShare"
                :font-size="12"
                :data="player"
              />
            </header>

            <!-- Player basic info -->
            <nos-player-modal-info :player="player" />

            <div class="comment">
              <!-- Add Comment Area -->
              <p class="player-modal__comment-title">
                Comments
              </p>

              <div class="player-modal__add-comment">
                <!-- CAUTION !!!!!!!!! -->
                <!-- FAKE COMMENT FORM -->
                <div
                  v-if="isAdmin"
                  style="margin-bottom: 16px;"
                >
                  <div
                    class="player-modal__comment-editor"
                  >
                    <input
                      v-model="fakeUsername"
                      type="text"
                      maxlength="20"
                      placeholder="Username"
                      :style="{
                        maxWidth: '100px',
                        height: '48px',
                        marginRight: '6px',
                        padding: '8px 12px',
                        border: '1px solid #1976d2',
                        fontSize: '12px'
                      }"
                    >
                    <textarea
                      v-model="fakeCommentContent"
                      cols="30"
                      rows="2"
                      maxlength="200"
                      :placeholder="`How was ${player.known_as} this week?`"
                      style="border: 1px solid #1976d2; height: 48px; padding: 2px 12px"
                    />
                  </div>

                  <button
                    :style="{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#1976d2',
                      color: 'white'
                    }"
                    :disabled="!fakeUsername || !fakeCommentContent"
                    @click="addFakeComment"
                  >
                    ADD
                  </button>
                </div>
                <!-- FAKE COMMENT FORM END -->


                <validation-observer
                  ref="addCommentRef"
                  v-slot="{ invalid }"
                >
                  <div class="player-modal__comment-editor">
                    <nos-textarea
                      v-model="newCommentContent"
                      cols="30"
                      rows="2"
                      :rules="'required|newline_limit:10|min:5|max:200'"
                      :max-length="200"
                      :placeholder="`How was ${player.known_as} this week?`"
                      @textareaVal="newCommentContent = $event"
                    />

                    <button
                      :disabled="invalid || !newCommentContent || isCommentAdding"
                      @click="addComment"
                    >
                      ADD
                    </button>
                  </div>
                </validation-observer>

                <transition
                  name="fade"
                >
                  <nuxt-link
                    v-if="newCommentContent.length > 3"
                    class="player-modal__add-comment-community-guide"
                    :to="localePath({
                      name: 'about',
                      hash: '#community-guide'
                    })"
                  >
                    <v-icon
                      style="font-size: 15px"
                    >
                      mdi-information-outline
                    </v-icon>
                    <span>Community Guide</span>
                  </nuxt-link>
                </transition>
              </div>


              <!-- Comment Sorting -->
              <div
                v-if="comments.length"
                class="player-modal__comment-option"
              >
                <div class="player-modal__comment-count">
                  <v-icon>mdi-message-reply-text</v-icon>
                  <span>{{ player.comment_count }}</span>
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
                <!-- COMMENT MALFUNCTION UI -->
                <div
                  v-if="isCommentMalfunction"
                  class="player-modal__error-occured centered"
                >
                  <p class="centered">
                    Something wrong!<br>
                    Please refresh the page or try again after few minutes.
                  </p>
                </div>

                <!-- NO COMMENT UI -->
                <div
                  v-if="!comments.length && !isCommentAdding"
                  class="player-modal__no-comments"
                >
                  <p class="player-modal__no-comments-header centered">
                    <v-icon>mdi-comment-processing-outline</v-icon>
                    <span>Leave First Comment!</span>
                  </p>
                </div>

                <!-- ACTUAL COMMENTS -->
                <div v-else>
                  <pulse-loader
                    v-if="isCommentAdding"
                    :color="'#808080'"
                    :size="'6px'"
                    :style="{ 'margin': '16px' }"
                  />

                  <pulse-loader
                    v-if="isCommentsLoading"
                    class="centered"
                    :color="'white'"
                    :size="'6px'"
                    :style="{ 'margin': '16px', 'z-index': 20 }"
                  />

                  <ul class="player-modal__comments">
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
                        <!-- COMMENT ID FOR ADMIN, FAKE COMMENT VOTE -->
                        <div
                          v-if="isAdmin"
                          :style="{
                            display: 'flex',
                            alignItems: 'flex-end',
                            marginBottom: '6px',
                            fontSize: '13px'
                          }"
                        >
                          <span 
                            style="color: #1976d2"
                          >{{ comment.id }}</span>

                          <button
                            style="margin-left: 16px; color: #1976d2"
                            @click="requestFakeVotePlayerOpinion(comment, 'up')"
                          >
                            <v-icon style="color: #1976d2; font-size: 13px;">
                              mdi-thumb-up
                            </v-icon>
                            UP
                          </button>

                          <button
                            style="margin-left: 16px; color: #1976d2"
                            @click="requestFakeVotePlayerOpinion(comment, 'down')"
                          >
                            <v-icon style="color: #1976d2; font-size: 13px;">
                              mdi-thumb-down
                            </v-icon>
                            DN
                          </button>
                        </div>
                        <!-- FAKE END -->


                        <div class="player-modal__comment-meta">
                          <!-- <span
                              v-if="comment.user_authorization === 3"
                              class="player-modal__comment-user-badge"
                            >
                              1°c
                            </span> -->

                          <p class="player-modal__comment-username">
                            {{ comment.fake_username || comment.username }}
                          </p>
                          <p class="player-modal__comment-moment">
                            {{ $moment(comment.created_at).fromNow() }}
                          </p>
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
                              :key="linkPreviewResetKey"
                              :embed-link="comment.embedLink"
                              style="margin: 8px 0 10px 0;"
                            />

                            <!-- Comment more menu -->
                            <v-menu
                              v-if="getJwt()"
                              :content-class="'player-modal__v-menu'"
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

                              <v-list v-if="comment.user_id === getId()">
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
                                <v-list-item @click="openReportDialog(comment)">
                                  <v-list-item-title>
                                    <v-icon>mdi-alert</v-icon>Report
                                  </v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </div>

                          <!-- Edit comment -->
                          <div
                            v-else
                            class="player-modal__edit-opinion"
                          >
                            <validation-provider
                              v-slot="{ errors, invalid }"
                              :rules="'required|min:5|max:200|newline_limit:10'"
                              name="comment"
                            >
                              <textarea
                                id="comment"
                                v-model="comment.editCommentContent"
                                name="edit-comment"
                                maxlength="200"
                                :rows="calculateRowsOfEditCommentTextarea(comment)"
                              />

                              <div class="player-modal__opinion-action">
                                <button
                                  class="nos-simple-white-btn"
                                  @click="cancelEditComment(comment)"
                                >
                                  CANCEL
                                </button>

                                <button
                                  class="nos-simple-black-btn"
                                  :disabled="invalid"
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

                              <p class="player-modal__edit-comment-error">
                                {{ errors[0] }}
                              </p>
                            </validation-provider>
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
                            :class="{'player-modal--is-voted': comment.vote === 'up'}"
                            :disabled="isOpinionVoting"
                            @click="votePlayerOpinion(comment, 'up')"
                          >
                            <v-icon>mdi-thumb-up</v-icon>
                            <span v-if="comment.vote_up_count > 0">{{ comment.vote_up_count }}</span>
                          </button>

                          <button
                            :class="{'player-modal--is-voted': comment.vote === 'down'}"
                            :disabled="isOpinionVoting"
                            @click="votePlayerOpinion(comment, 'down')"
                          >
                            <v-icon>mdi-thumb-down</v-icon>
                            <span v-if="comment.vote_down_count > 0">{{ comment.vote_down_count }}</span>
                          </button>

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
                            maxlength="200"
                          >

                          <div class="player-modal__opinion-action">
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
                      <div
                        v-if="comment.isReply"
                        class="player-modal__replies"
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

                            <div
                              v-if="!reply.isEditing"
                              class="player-modal__reply-body"
                            >
                              <p
                                class="player-modal__reply-content"
                                v-html="$options.filters.commentFormatter(reply.content)"
                              />

                              <!-- Reply more menu -->
                              <v-menu
                                v-if="getJwt()"
                                :content-class="'player-modal__v-menu'"
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

                                <v-list v-if="reply.user_id === getId()">
                                  <v-list-item @click="editReply(reply)">
                                    <v-list-item-title>
                                      <v-icon>mdi-pencil</v-icon>Edit
                                    </v-list-item-title>
                                  </v-list-item>

                                  <v-list-item @click="deleteReply(comment, reply)">
                                    <v-list-item-title>
                                      <v-icon>mdi-delete</v-icon>Delete
                                    </v-list-item-title>
                                  </v-list-item>
                                </v-list>

                                <v-list v-else>
                                  <v-list-item @click="openReportDialog(reply)">
                                    <v-list-item-title>
                                      <v-icon>mdi-alert</v-icon>Report
                                    </v-list-item-title>
                                  </v-list-item>
                                </v-list>
                              </v-menu>
                            </div>

                            <!-- Edit Reply -->
                            <div
                              v-else
                              class="player-modal__edit-opinion"
                            >
                              <input
                                id="reply"
                                v-model="reply.editReplyContent"
                                type="text"
                                name="edit-reply"
                                :rules="'required'"
                                maxlength="200"
                              >

                              <div class="player-modal__opinion-action">
                                <button
                                  class="nos-simple-white-btn"
                                  @click="cancelEditReply(reply)"
                                >
                                  CANCEL
                                </button>

                                <button
                                  class="nos-simple-black-btn"
                                  :disabled="!reply.content.trim()"
                                  @click="saveEditReply(reply)"
                                >
                                  <pulse-loader
                                    v-if="reply.isEditReplySaving"
                                    :color="'white'"
                                    :size="'4px'"
                                  />
                                  <span v-else>SAVE</span>
                                </button>
                              </div>
                            </div>

                            <!-- Reply sub action -->
                            <div class="player-modal__reply-sub-action">
                              <button
                                :class="{'player-modal--is-voted': reply.vote === 'up'}"
                                :disabled="isOpinionVoting"
                                @click="votePlayerOpinion(reply, 'up')"
                              >
                                <v-icon>mdi-thumb-up</v-icon>
                                <span v-if="reply.vote_up_count > 0">{{ reply.vote_up_count }}</span>
                              </button>
                              <button
                                :class="{'player-modal--is-voted': reply.vote === 'down'}"
                                :disabled="isOpinionVoting"
                                @click="votePlayerOpinion(reply, 'down')"
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

                      <div
                        v-if="comment.addedReply && !comment.isReply"
                        class="player-modal__added-reply"
                      >
                        <p class="player-modal__added-reply-username">
                          {{ comment.addedReply.username }}
                        </p>
                        <p
                          class="player-modal__added-reply-content"
                          v-html="$options.filters.commentFormatter(comment.addedReply.content)"
                        />
                      </div>
                    </li>
                  </ul>
                </div>

                <div
                  v-if="comments.length && (player.comment_count > comments.length)"
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


          <!-- MODAL RIGHT -->
          <div
            v-if="!isAdmin"
            class="player-modal__right"
          >
            <nos-fixtures-area
              :club-id="player.club_id"
              :club-name="player.club_name"
              :is-header="true"
            />

            <nos-news-area
              style="margin-top: 8px"
              :news-keyword="playerName"
            />
          </div>
        </div> 
      </div>
    </div>


    <!-- LOGIN POPUP (for Guest) -->
    <transition name="fade">
      <nos-request-login-popup
        v-if="isRequestLoginPopup"
        @closeRequestLoginPopup="isRequestLoginPopup = false"
      />
    </transition>


    <!-- OPINION REPORT DIALOG -->
    <v-dialog
      v-model="isReportDialog"
      scrollable
      max-width="400px"
    >
      <v-card>
        <v-card-title>Report</v-card-title>
        <v-divider />
        <v-card-text v-if="!isReportSaved">
          <v-radio-group
            v-model="reportReason"
            column
          >
            <v-radio
              label="Insult, sexual harassment, and malicious attack on players or other users"
              value="insult"
              color="#f4991e"
            />
            <v-radio
              label="Promotes or condones violence against individuals
                or groups based on race or ethnic origin, religion, disability, gender,
                age, nationality, veteran status, caste"
              value="discrimination"
              color="#f4991e"
            />
            <v-radio
              label="Simultaneous posting/duplicate comments"
              value="plastered"
              color="#f4991e"
            />
            <v-radio
              label="Comments that are harmful to the community"
              value="harmful"
              color="#f4991e"
            />
            <v-radio
              label="Advertising"
              value="advertising"
              color="#f4991e"
            />
          </v-radio-group>
        </v-card-text>

        <v-card-text
          v-else
          style="text-align: center"
        >
          <v-icon
            :style="{
              margin: '24px 0 16px',
              fontSize: '52px',
              color: '#f4991e'
            }"
          >
            mdi-checkbox-marked-circle-outline
          </v-icon>
          <p>The report was submitted. Restrictions will be given according to the guidelines after the review.</p>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="!isReportSaved"
            color="#f4991e"
            text
            @click="isReportDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            v-if="!isReportSaved"
            color="#f4991e"
            text
            :disabled="!reportReason"
            @click="saveReport"
          >
            Report
          </v-btn>
          <v-btn
            v-if="isReportSaved"
            color="#f4991e"
            text
            @click="isReportDialog = false"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
@import "./_comment-style.scss";
@import "./_reply-style.scss";
</style>