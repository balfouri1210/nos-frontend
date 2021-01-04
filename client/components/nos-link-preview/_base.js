import U from '@/lib/util';

export default {
  props: {
    embedLink: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      linkType: null,
      metaData: {},
      youtubeVideoId: null,
      expanded: false
    };
  },

  async mounted() {
    try {
      if (this.embedLink.indexOf('youtube.com') !== -1) {
        this.youtubeVideoId = this.embedLink.substr(this.embedLink.indexOf('v=') + 2, 11);
        const searchResult = await this.$axios.$get(
          'https://www.googleapis.com/youtube/v3/videos', {
            params: {
              key: process.env.YOUTUBE_API_KEY,
              part: 'status',
              id: this.youtubeVideoId
            }
          }
        );
  
        if (searchResult && searchResult.items.length > 0) {
          if (searchResult.items[0].status.embeddable) {
            this.linkType = 'youtube';
          } else {
            this.requestMetadata(this.embedLink);
          }
        }
      } else {
        this.requestMetadata(this.embedLink);
      }
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    async requestMetadata(link) {
      // this.metaData = await this.$axios.$get('https://og-crawler.907degrees.com/link', {
      //   params: {
      //     url: link
      //   }
      // });

      // if (this.metaData.statusCode !== 500)
      //   this.setLinkType(link);

      this.metaData = await this.$axios.$get(`https://graph.facebook.com/v8.0/instagram_oembed?url=${link}&omitscript=true&hidecaption=&maxwidth=640&access_token=646892209357886|_RQ6A8eDdvhsM8A2aYSLtArvghY`, {
        params: {
          origin: '*'
        }
      });
      console.log(this.metaData);
    },

    setLinkType(link) {
      if (link.indexOf('instagram.com') !== -1) {
        this.linkType = 'instagram';
      } else if (link.indexOf('twitter.com') !== -1) {
        this.linkType = 'twitter';
        this.metaData.manipulatedHtml = this.metaData.html.replace('class="twitter-tweet"', 'class="twitter-collapsed"');
      } else {
        this.linkType = 'normal';
      }
    },

    renderEmbedLink() {
      this.expanded = true;

      if (this.linkType === 'instagram') {
        setTimeout(() => {
          window.instgrm.Embeds.process();
        }, 10);
      } else if (this.linkType === 'twitter') {
        window.twttr.widgets.load();
      }
    },

    isEmpty(obj) {
      return U.isEmpty(obj, true);
    }
  }
};