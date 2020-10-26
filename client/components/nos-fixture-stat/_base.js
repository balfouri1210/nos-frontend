import { eplClubs, apiFootballRequestHeader } from '@/lib/constants';

export default {
  props: {
    fixture: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      fixtureInfoLoaded: false,
      getFixtureInfoFailed: false,
      fixtureInfo: {},
      fixtureEvents: []
    };
  },

  created() {
    this.getFixtureInfo();
  },

  methods: {
    async getFixtureInfo() {
      try {
        const [fixtureInfo, fixtureEvents]
          = await Promise.all([
            this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/statistics/fixture/${this.fixture.fixture_id}`, apiFootballRequestHeader),
            this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/events/${this.fixture.fixture_id}`, apiFootballRequestHeader)
          ]);

        this.fixtureInfo = fixtureInfo.api.statistics;
        this.fixtureEvents = this.fixtureEventsManipulate(fixtureEvents);

        this.fixtureInfoLoaded = true;
      } catch (err) {
        console.error(err);
        this.fixtureInfoLoaded = true;
        this.getFixtureInfoFailed = true;
      }
    },

    totalPropertyCountOfFixture(property) {
      return parseInt(this.fixtureInfo[property].home) + parseInt(this.fixtureInfo[property].away);
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