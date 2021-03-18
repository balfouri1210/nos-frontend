import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';
import { eplClubs, apiFootballLeagueId } from '@/lib/constants';
import countries from '@/lib/countries';
import nosFixturesArea from '@/components/nos-fixtures-area/nos-fixtures-area.vue';
import nosPlayerModal from '@/components/nos-player-modal/nos-player-modal.vue';
import nosNewsHeadline from '@/components/nos-news-headline/nos-news-headline.vue';
import U from '@/lib/util';

export default {
  head() {
    return {
      title: 'Search player',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Search player and leave your opinion'
        }
      ]
    };
  },

  components: {
    nosPlayerList,
    nosFixturesArea,
    nosPlayerModal,
    nosNewsHeadline
  },

  data() {
    return {
      searchKeyword: undefined,
      targetCountry: {},
      targetClub: {},
      targetClubs: undefined,

      targetPlayer: {},
      targetPlayerComments: [],

      topPlayerScore: 0,
      searchPlayerList: [],
      isSearchFinished: false,
      clubStanding: {},

      nosImageUrl: process.env.NOS_IMAGE_URL
    };
  },

  created() {
    if (this.$route.params.searchData) {
      const [searchTarget, searchData] = this.$route.params.searchData.split('_');

      if (searchTarget === 'keyword') {
        this.searchKeyword = searchData;
      } else if (searchTarget === 'country') {
        this.setTargetCountry(searchData);
      } else if (searchTarget === 'club') {
        this.setTargetClub(searchData);
        this.getClubStanding(this.targetClub.api_football_team_id);
      } else if (searchTarget === 'clubs') {
        this.targetClubs = searchData;
      }
    }

    this.getSearchResult();
  },

  methods: {
    async getSearchResult() {
      try {
        const [topPlayer, searchPlayerList] = await Promise.all([
          this.$axios.$get('/api/players/top-player'),
          this.$axios.$get('/api/search', {
            params: {
              keyword: this.searchKeyword,
              countryId: this.targetCountry.id,
              clubId: this.targetClub.id,
              clubIdList: this.targetClubs
            }
          })
        ]);

        this.isSearchFinished = true;
        this.topPlayerScore = topPlayer.score;
        this.searchPlayerList = searchPlayerList;
      } catch (err) {
        console.error(err);
        return this.$nuxt.error({ statusCode: 500 });
      }
    },

    setTargetCountry(searchData) {
      const countryInfo = searchData.split('-');
      this.targetCountry = countries.find(country => country.id === parseInt(countryInfo[1]));
    },

    setTargetClub(searchData) {
      this.targetClub = eplClubs.find(club => club.id === parseInt(searchData));
    },

    async selectPlayerHandler(selectedPlayer) {
      try {
        const [player, comments] = await Promise.all([
          this.getPlayer(selectedPlayer),
          this.getComments(selectedPlayer)
        ]);

        this.targetPlayer = player;
        this.targetPlayerComments = comments;
      } catch (err) {
        console.error(err);
        this.$nuxt.error({ statusCode: 500 });
      }
    },

    getPlayer(selectedPlayer) {
      return this.$axios.$get(`/api/players/${selectedPlayer.id}`);
    },

    getComments(selectedPlayer) {
      return this.$axios.$get(`/api/comments/player/${selectedPlayer.id}`, {
        params: {
          sortType: 'date'
        }
      });
    },

    async getClubStanding(targetClubFootballApiId) {
      try {
        const clubStanding = await this.$axios.$get('/api/clubs/standings', {
          params: {
            leagueId: apiFootballLeagueId.epl2021
          }
        });

        this.clubStanding = clubStanding[0].find(club => club.team_id === targetClubFootballApiId);
      } catch (err) {
        console.error(err);
      }
    },

    isEmpty(obj) {
      return U.isEmpty(obj, true);
    }
  }
};