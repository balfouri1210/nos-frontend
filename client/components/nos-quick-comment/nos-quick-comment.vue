<template>
  <div class="quick-comment">
    <p class="quick-comment__title">
      <v-icon>mdi-comment-flash-outline</v-icon>
      Search player and Leave Quick Comment
    </p>
    <validation-observer v-slot="{ handleSubmit }">
      <form
        id="playerSearchForm"
        @submit.prevent="handleSubmit(searchPlayerByKeyword)"
      >
        <div class="quick-comment__search-form">
          <nos-input
            type="text"
            :rules="'required|min:3'"
            :value="searchKeyword"
            :autocomplete="'new-password'"
            :placeholder="'Search Player'"
            :clearable="true"
            :is-loading="isSearching"
            :is-error-message="false"
            @input="searchKeyword = $event"
          />
        </div>
      </form>
    </validation-observer>

    <div
      v-if="playerList.length > 0"
      class="nos-search-modal__suggestion"
    >
      <ul>
        <li
          v-for="(player, index) in playerList"
          :key="index"
        >
          <button @click="selectPlayer(player)">
            <div class="nos-search-modal__suggestion-name">
              <img
                :src="player.club_image"
                alt="club"
              >
              <span>{{ player.known_as }}</span>
            </div>

            <span class="nos-search-modal__suggestion-info">
              <img
                :src="`${nosImageUrl}/flags/${player.country_code.toLowerCase()}.png`"
                :alt="player.country_code"
              >
              {{ $moment.unix(player.birthday).format('DD / MM / YYYY') }}
              <span class="nos-search-modal__suggestion-info-detail">, {{ player.height }}cm, {{ player.position }}</span>
            </span>
          </button>
        </li>
      </ul>
    </div>

    <div
      v-if="selectedPlayer"
      class="quick-comment__content"
    >
      <div>
        <div class="quick-comment__player-meta">
          <img
            class="quick-comment__club-image"
            :src="selectedPlayer.club_image"
            alt="club image"
          >
          <div>
            <p>{{ selectedPlayer.known_as }}</p>
            <p class="quick-comment__sub-info">
              {{ selectedPlayer.country_name }}, {{ $moment.unix(selectedPlayer.birthday).format('DD / MM / YYYY') }}, {{ selectedPlayer.height }}cm, {{ selectedPlayer.position }}
            </p>
          </div>
        </div>

        <validation-observer
          ref="quickCommentRef"
          v-slot="{ invalid }"
        >
          <nos-textarea
            v-model="quickCommentContent"
            cols="30"
            rows="2"
            :rules="'required|newline_limit:10|min:5|max:200'"
            :max-length="200"
            :placeholder="`How was ${selectedPlayer.known_as} this week?`"
            @textareaVal="quickCommentContent = $event"
          />

          <div class="quick-comment__action">
            <button
              class="quick-comment__action-cancel"
              @click="cancelQuickComment"
            >
              CANCEL
            </button>

            <button
              class="quick-comment__action-add"
              :disabled="invalid || !quickCommentContent || isQuickCommentAdding"
              @click="addQuickComment"
            >
              <span v-if="!isQuickCommentAdding">ADD</span>

              <pulse-loader
                v-if="isQuickCommentAdding"
                :color="'#f4991e'"
                :size="'6px'"
              />
            </button>
          </div>
        </validation-observer>
      </div>
    </div>

    <!-- LOGIN POPUP (for Guest) -->
    <transition name="fade">
      <nos-request-login-popup
        v-if="isRequestLoginPopup"
        @closeRequestLoginPopup="isRequestLoginPopup = false"
      />
    </transition>
  </div>
</template>

<script>
import Base from './_base';

export default {
  mixins: [Base]
};
</script>

<style lang="scss" scoped>
@import './_style.scss';
@import "@/components/nos-modals/nos-search-modal/_style.scss";
</style>