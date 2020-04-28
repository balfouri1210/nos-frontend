<template>
  <div class="youtube-area">
    <div class="youtube-area__header">
      <div class="youtube-area__search-form">
        <validation-observer v-slot="{ handleSubmit }">
          <form
            id="youtubeSearchForm"
            @submit.prevent="handleSubmit(searchYoutube)"
          >
            <div class="youtube-area__input">
              <img
                src="logos/youtube.png"
                alt="youtube"
              >
              <nos-input
                type="text"
                :value="youtubeSearchKeyword"
                :autocomplete="'new-password'"
                :placeholder="'Search Youtube Videos'"
                @input="youtubeSearchKeyword = $event"
              />
              <button @click="searchYoutube">
                <v-icon>mdi-magnify</v-icon>
              </button>
            </div>
          </form>
        </validation-observer>

        <div
          class="youtube-area__sorting"
        >
          <v-menu
            :content-class="'youtube-area__v-menu'"
            transition="slide-y-transition"
            bottom
            left
            :offset-y="true"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                text
                v-on="on"
              >
                <v-icon>mdi-tune</v-icon>
                <span>Upload date</span>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="setYoutubeSearchPeriod('24h')">
                <v-list-item-title
                  :class="{'youtube-area__period--selected': youtubeSearchPeriod === '24h'}"
                >
                  Last 24 hours
                </v-list-item-title>
              </v-list-item>

              <v-list-item @click="setYoutubeSearchPeriod('7d')">
                <v-list-item-title
                  :class="{'youtube-area__period--selected': youtubeSearchPeriod === '7d'}"
                >
                  Last 7 days
                </v-list-item-title>
              </v-list-item>

              <v-list-item @click="setYoutubeSearchPeriod('30d')">
                <v-list-item-title
                  :class="{'youtube-area__period--selected': youtubeSearchPeriod === '30d'}"
                >
                  Last 30 days
                </v-list-item-title>
              </v-list-item>

              <v-list-item @click="setYoutubeSearchPeriod()">
                <v-list-item-title>Unset</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>

    <div
      v-if="isYoutubeSearching"
      class="centered"
    >
      <v-progress-circular
        :size="20"
        :width="2"
        color="#ff0201"
        indeterminate
      />
    </div>

    <ul class="youtube-area__video-list">
      <li
        v-for="(video, index) in youtubeSearchResult"
        :key="index"
      >
        <button
          class="youtube-area__video"
          @click="selectYoutubeVideo(video.videoId)"
        >
          <div
            class="youtube-area__video-thumbnail"
            :style="{
              backgroundImage: `url(${video.thumbnails.medium.url}),  url(/player_default.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }"
          >
            <span>{{ $moment.duration(video.duration).format('h:mm:ss').padStart(4, '0:0') }}</span>
          </div>
          <div class="youtube-area__video-info">
            <p
              class="video-info__title"
              v-html="video.title"
            />
            <span>{{ video.channelTitle }} | {{ $moment(video.publishedAt).fromNow() }}</span>
            <span>Hits: {{ video.viewCount | abbrNum(1) }}</span>
          </div>
        </button>
      </li>
    </ul>

    <div
      v-if="!isYoutubeSearching"
      class="youtube-area__load-more-video"
    >
      <button
        v-if="youtubeNextPageToken"
        @click="loadMoreVideos"
      >
        <v-progress-circular
          v-if="isMoreYoutubeSearching"
          :size="20"
          :width="2"
          color="#808080"
          indeterminate
        />
        <span v-else>Load More Videos</span>
      </button>
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