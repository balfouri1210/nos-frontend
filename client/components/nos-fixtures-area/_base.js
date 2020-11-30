import { eplClubs, apiFootballRequestHeader } from '@/lib/constants';
import nosFixtureStat from '@/components/nos-fixture-stat/nos-fixture-stat.vue';

export default {
  props: {
    clubId: {
      type: Number,
      default: null
    },

    clubName: {
      type: String,
      default: null
    },

    isHeader: {
      type: Boolean,
      default: false
    }
  },

  components: {
    nosFixtureStat
  },

  data() {
    return {
      lastFixture: null,
      nextFixture: null,
      areFixturesLoaded: false,

      showLastFixtureInfo: false,

      lastFixtureInfo: null,
      lastFixtureEvents: null,
      showLastFixtureInfoLoaded: false
    }; 
  },

  async created() {
    const targetClub = eplClubs.filter(club => {
      return club.id === this.clubId;
    })[0];

    try {
      if (this.$store.getters['auth/getAuthorization'] !== 3) {
        [this.lastFixture, this.nextFixture] =
          await Promise.all([
            this.getLastFixture(targetClub.api_football_team_id),
            this.getNextFixture(targetClub.api_football_team_id)
          ]);

        if (this.lastFixture)
          this.lastFixture = this.lastFixture.api.fixtures[0];

        if (this.nextFixture)
          this.nextFixture = this.nextFixture.api.fixtures[0];
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.areFixturesLoaded = true;
    }
  },

  methods: {
    getLastFixture(apiFootballTeamId) {
      return this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/fixtures/team/${apiFootballTeamId}/last/1`, apiFootballRequestHeader);
    },

    getNextFixture(apiFootballTeamId) {
      return this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/fixtures/team/${apiFootballTeamId}/next/1`, apiFootballRequestHeader);
    },

    goToFixturePlayers(fixture) {
      const result = eplClubs
        .filter(club => club.api_football_team_id === fixture.homeTeam.team_id || club.api_football_team_id === fixture.awayTeam.team_id)
        .map(item => item.id)
        .join('-');

      this.$router.push(this.localePath({
        name: 'search-searchData',
        params: {
          searchData: `clubs_${result}`
        }
      }));
    }
  }
};