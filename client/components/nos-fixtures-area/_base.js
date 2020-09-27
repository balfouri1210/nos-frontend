import { eplClubs, apiFootballRequestHeader } from '@/lib/constants';

export default {
  props: {
    clubId: {
      type: Number,
      default: null
    },

    isHeader: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      lastFixture: null,
      nextFixture: null,
      areFixturesLoaded: false,

      showLastFixtureInfo: false,

      lastFixtureInfo: null,
      lastFixtureEvents: null,
      getLastFixtureInfoFailed: false,
      showLastFixtureInfoLoaded: false,

      isLocalEnv: process.env.STAGE === 'local'
    }; 
  },

  async created() {
    const targetClub = eplClubs.filter(club => {
      return club.id === this.clubId;
    })[0];

    try {
      [this.lastFixture, this.nextFixture] =
      await Promise.all([
        this.getLastFixture(targetClub.api_football_team_id),
        this.getNextFixture(targetClub.api_football_team_id)
      ]);

      this.lastFixture = this.lastFixture.api.fixtures[0];
      this.nextFixture = this.nextFixture.api.fixtures[0];
      this.areFixturesLoaded = true;
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    getLastFixture(apiFootballTeamId) {
      return this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/fixtures/team/${apiFootballTeamId}/last/1`, apiFootballRequestHeader);
    },

    getNextFixture(apiFootballTeamId) {
      return this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/fixtures/team/${apiFootballTeamId}/next/1`, apiFootballRequestHeader);
    },

    async getLastFixtureInfo() {
      try {
        if (this.showLastFixtureInfo) {
          this.showLastFixtureInfo = false;
        } else {
          this.showLastFixtureInfo = true;
          // 한번 로드되면 닫고 다시 열더라도 기존에 로드된 정보 보여주기 (api request 감소)
          if (this.showLastFixtureInfoLoaded) return;

          const [lastFixtureInfo, lastFixtureEvents]
            = await Promise.all([
              this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/statistics/fixture/${this.lastFixture.fixture_id}`, apiFootballRequestHeader),
              this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/events/${this.lastFixture.fixture_id}`, apiFootballRequestHeader)
            ]);

          this.lastFixtureInfo = lastFixtureInfo.api.statistics;
          this.lastFixtureEvents = this.fixtureEventsManipulate(lastFixtureEvents);

          this.showLastFixtureInfoLoaded = true;
        }
      } catch (err) {
        console.error(err);
        this.showLastFixtureInfoLoaded = true;
        this.getLastFixtureInfoFailed = true;
      }
    },

    totalPropertyCountOfFixture(property) {
      if (this.showLastFixtureInfo)
        return parseInt(this.lastFixtureInfo[property].home) + parseInt(this.lastFixtureInfo[property].away);
    },

    fixtureEventsManipulate(events) {
      let result = events.api.events.filter(event => {
        return event.type === 'Goal';
      });

      if (result.length > 0) {
        result.forEach(event => {
          event.splitted_name = event.player.split(' ');
          eplClubs.forEach(club => {
            if (event.team_id === club.api_football_team_id)
              event.nos_club_id = club.id;
          });
        });
      }

      return result;
    },

    watchOnYoutube(homeTeam, awayTeam) {
      const fallback = `https://youtube.com/results?search_query=${homeTeam} ${awayTeam}`;
      window.open(fallback, '_blank');

      function killPopup() {
        window.removeEventListener('pagehide', killPopup);
      }

      window.addEventListener('pagehide', killPopup);
    }
  }
};