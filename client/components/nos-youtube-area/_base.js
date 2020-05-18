export default {
  props: {
    searchKeyword: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      youtubeSearchResult: [],
      youtubeNextPageToken: null,
      isYoutubeSearching: false,
      isMoreYoutubeSearching: false,
      youtubeSearchFailed: false,
      youtubeSearchKeyword: this.searchKeyword,
      youtubeSearchPeriod: null,

      publishedAfter: null
    };
  },

  created() {
    this.getYoutubeSearchResult(this.searchKeyword);
  },

  methods: {
    async getYoutubeSearchResult(searchKeyword, publishedAfter) {
      try {
        if (this.youtubeNextPageToken) {
          this.isMoreYoutubeSearching = true;
        } else {
          this.isYoutubeSearching = true;
        }

        const searchResult = await this.$axios.$get(
          'https://www.googleapis.com/youtube/v3/search', {
            params: {
              key: process.env.YOUTUBE_API_KEY,
              part: 'snippet',
              q: searchKeyword,
              type: 'video',
              maxResults: 30,
              pageToken: this.youtubeNextPageToken,
              fields: 'nextPageToken,items/id,items/snippet/channelTitle,items/snippet/publishedAt,items/snippet/title,items/snippet/thumbnails',
              publishedAfter
            }
          }
        );

        const searchResultIdList = searchResult.items.map(item => {
          return item.id.videoId;
        });

        const searchResultStat = await this.getVideoStat(searchResultIdList);

        searchResult.items = searchResult.items.map(item => {
          searchResultStat.items.forEach(subItem => {
            if (item.id.videoId === subItem.id) {
              item.snippet.duration = subItem.contentDetails.duration;
              item.snippet.viewCount = subItem.statistics.viewCount;
            }
          });

          return {
            videoId: item.id.videoId,
            ...item.snippet
          };
        });

        // Renew nextPageToken
        this.youtubeNextPageToken = searchResult.nextPageToken;

        // Insert new videos into previous list
        this.youtubeSearchResult.push(...searchResult.items);
      } catch (err) {
        console.error(err);
        this.youtubeSearchFailed = true;
      } finally {
        this.isMoreYoutubeSearching = false;
        this.isYoutubeSearching = false;
      }
    },

    getVideoStat(searchResultIdList) {
      return this.$axios.$get(
        'https://www.googleapis.com/youtube/v3/videos', {
          params: {
            key: process.env.YOUTUBE_API_KEY,
            part: 'contentDetails, statistics',
            id: searchResultIdList.join(','),
            fields: 'items/id, items/contentDetails/duration, items/statistics/viewCount'
          }
        }
      );
    },

    clearYoutubeSearchConfiguration() {
      this.youtubeSearchResult = [];
      this.youtubeNextPageToken = null;
      this.youtubeSearchPeriod = null;
    },

    loadMoreVideos() {
      this.getYoutubeSearchResult(this.youtubeSearchKeyword, this.publishedAfter);
    },

    searchYoutube() {
      this.clearYoutubeSearchConfiguration();
      this.getYoutubeSearchResult(this.youtubeSearchKeyword);
    },

    setYoutubeSearchPeriod(period) {
      this.clearYoutubeSearchConfiguration();
      this.youtubeSearchPeriod = period;

      switch (period) {
      case '24h':
        this.publishedAfter = this.$moment().subtract(24, 'hours').toISOString();
        break;

      case '7d':
        this.publishedAfter = this.$moment().subtract(7, 'days').toISOString();
        break;

      case '30d':
        this.publishedAfter = this.$moment().subtract(30, 'days').toISOString();
        break;

      default:
        this.publishedAfter = null;
      }

      this.getYoutubeSearchResult(this.youtubeSearchKeyword, this.publishedAfter);
    },

    selectYoutubeVideo(videoId) {
      this.$emit('selectYoutubeVideo', videoId);
    }
  }
};