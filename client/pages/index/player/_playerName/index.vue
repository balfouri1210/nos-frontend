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
          <h1>
            {{ $t('greeting') }}: {{ playerName }}
          </h1>

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

          <div class="player-modal__comments">
            <ul>
              <li
                v-for="(comment, index) in comments"
                :key="index"
              >
                {{ comment.username }} : {{ comment.content }}

                <div class="player-modal__comment-sub-action">
                  <button @click="voteUp">
                    <i class="material-icon">thumb_up_alt</i>
                    <span>{{ comment.vote_up }}</span>
                  </button>
                  <button @click="voteDown">
                    <i class="material-icon">thumb_down_alt</i>
                    <span>{{ comment.vote_down }}</span>
                  </button>
                  <button @click="comment.isNewChildComment = !comment.isNewChildComment">
                    REPLY
                  </button>
                </div>

                <!-- Add new child comment -->
                <div
                  v-if="comment.isNewChildComment"
                  class="player-modal__add-child-comment"
                >
                  <div class="player-modal__child-comment-editor">
                    <input
                      id="comment"
                      v-model="comment.childCommentContent"
                      type="text"
                      name="comment"
                      :rules="'required'"
                      maxlength="100"
                    >

                    <div class="player-modal__child-comment-action">
                      <button
                        @click="cancelChildComment(comment)"
                      >
                        CANCEL
                      </button>

                      <button
                        @click="addChildComment(comment)"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  v-if="comment.child_comment_count"
                  @click="loadChildComments(comment)"
                >
                  <span v-if="!comment.isChildComment">
                    Load child {{ comment.child_comment_count }} comments
                  </span>
  
                  <span v-if="comment.isChildComment">
                    Hide replies
                  </span>
                </button>
                
                <!-- Load child comments -->
                <div
                  v-if="comment.isChildComment"
                  class="player-modal__child-comments"
                >
                  <ul>
                    <li
                      v-for="(childComment, childIndex) in comment.childComments"
                      :key="childIndex"
                    >
                      <p style="color: skyblue">
                        {{ childComment.username }}: {{ childComment.content }}
                      </p>
                    </li>
                  </ul>
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