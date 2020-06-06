<template>
  <div class="youtube-area">
    <div class="youtube-area__header">
      <!-- <div class="youtube-area__search-form"> -->
      <div class="youtube-area__header-title">
        <button @click="goToYoutube">
          <img
            src="logos/youtube.png"
            alt="youtube"
          >
          <span>On Youtube</span>
        </button>
      </div>
      <!-- <validation-observer v-slot="{ handleSubmit }">
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
        </validation-observer> -->

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
      <!-- </div> -->
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

    <div v-if="youtubeSearchResult.length > 0">
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
              <span class="video-info__channel-title">
                {{ video.channelTitle }}
              </span>
              <span class="video-info__etc">
                Hits: {{ video.viewCount | abbrNum(1) }} | {{ $moment(video.publishedAt).fromNow() }}
              </span>
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

    <!-- YOUTUBE DATA API QUOTA EXCEED UI -->
    <div
      v-if="youtubeSearchFailed && !isYoutubeSearching"
      class="youtube-area__quota-exceed"
    >
      <img
        src="logos/youtube.png"
        alt="youtube"
      >
      <p>
        Sorry. Due to the high traffic, YouTube data quota has been exceeded.
        Until 08:00 UTC, please go to YouTube to continue watching the video.
      </p>
      <button @click="goToYoutube">
        Go to {{ youtubeSearchKeywordCopied.replace(/-/g, ' ') }} videos
      </button>

      <span>
        Due to the YouTube policy, the only limited amount of data can be provided daily.
        Additional daily data has been requested to YouTube,
        however, we are unsure with the timeline for review and final confirmation.
        We apologize for any inconvenience caused by an unpredictable timeline.
        We will try our best to quickly solve this issue.
      </span>
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