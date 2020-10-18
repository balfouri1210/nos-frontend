import nosTopPlayer from '@/components/nos-top-player/nos-top-player.vue';
import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';
import nosCountdown from '@/components/nos-countdown/nos-countdown';
import nosPreseasonUi from '@/components/nos-preseason-ui/nos-preseason-ui.vue';
import nosOnboardingUi from '@/components/nos-onboarding-ui/nos-onboarding-ui.vue';
import nosMainEvent from '@/components/nos-main-event/nos-main-event.vue';
import { apiFootballRequestHeader, apiFootballLeagueId } from '@/lib/constants';
import { premierLeagueSchedule, faCupSchedule } from '@/lib/schedules';
import nosLandingCommentArea from '@/components/nos-landing-comment-area/nos-landing-comment-area.vue';
import { eplClubs } from '@/lib/constants';
import nosFixtureStat from '@/components/nos-fixture-stat/nos-fixture-stat.vue';

export default {
  layout: 'wide',

  components: {
    nosTopPlayer,
    nosPlayerList,
    nosCountdown,
    nosPreseasonUi,
    nosOnboardingUi,
    nosMainEvent,
    nosLandingCommentArea,
    nosFixtureStat
  },

  fetch({ store }) {
    store.dispatch('updateAppStatus');
  },

  async asyncData({ $axios, error, store, $ua, redirect, app }) {
    try {
      const browser = $ua.browser().toLowerCase();
      if (browser === 'internet explorer')
        return redirect(app.localePath('unsupported-browser'));

      if (store.getters.getAppStatus === 'preseason') {
        return;
      } else {
        const wholePlayerList = await $axios.$get('/api/players', {
          params: {
            count: 21
          }
        });
        const topPlayer = wholePlayerList[0];

        const high4Players = wholePlayerList.slice(1, 5);
        const high8Players = wholePlayerList.slice(5, 13);
        const restOfPlayers = wholePlayerList.slice(13, wholePlayerList.length);
        return { topPlayer, high4Players, high8Players, restOfPlayers };
      }
    } catch (err) {
      console.error(err);
      error({ statusCode: 400 });
    }
  },

  data() {
    return {
      playerCommentsPreview: [],

      showHowToUse: false,
      isFixtures: false,
      isTable: false,

      selectedLeagueSchedule: [],
      targetScheduleIndex: null,
      isFixturesLoading: false,
      isTableLoading: false,
      selectedLeague: 'pl',
      fixtures: [],
      getFixturesFailed: false,

      leagueTable: []
    };
  },

  computed: {
    previousPlayerIdList() {
      const result = this.high4Players.concat(this.high8Players).map(player => player.id).concat(this.topPlayer.id);
      return result;
    }
  },

  methods: {
    seasonEndHandler() {
      window.location.reload();
    },

    selectFixtureMenu() {
      this.isTable = false;
      this.isFixtures = !this.isFixtures;

      if (this.isFixtures && this.fixtures.length === 0) {
        this.selectedLeagueSchedule = premierLeagueSchedule;
        this.initiateTargetScheduleIndex();
        this.getFixturesByLeagueId(apiFootballLeagueId.epl2021);
      }
    },

    selectTableMenu() {
      this.isFixtures = false;
      this.isTable = !this.isTable;

      if (this.leagueTable.length === 0)
        this.getLeagueTable();
    },

    selectLeague(league) {
      this.fixtures = [];
      this.selectedLeague = league;

      if (this.selectedLeague === 'pl') {
        this.selectedLeagueSchedule = premierLeagueSchedule;
        this.initiateTargetScheduleIndex();
        this.getFixturesByLeagueId(apiFootballLeagueId.epl2021);
      } else {
        this.selectedLeagueSchedule = faCupSchedule;
        this.initiateTargetScheduleIndex();
        this.getFixturesByLeagueId(apiFootballLeagueId.faCup2021);
      }
    },

    // fixture area의 시작 날짜를 설정하는 함수
    initiateTargetScheduleIndex() {
      for (const [index, el] of this.selectedLeagueSchedule.entries()) {
        if (this.$moment(el).format('YYYYMMDD') >= this.$moment.utc().format('YYYYMMDD')) {
          this.targetScheduleIndex = index;
          break;
        }
      }

      if (this.targetScheduleIndex === null)
        this.targetScheduleIndex = this.selectedLeagueSchedule.length - 1;
    },

    async getFixturesByLeagueId(leagueId) {
      this.fixtures = [];
      this.getFixturesFailed = false;
      this.isFixturesLoading = true;

      try {
        this.fixtures =
          (await this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/fixtures/league/${leagueId}/${this.$moment(this.selectedLeagueSchedule[this.targetScheduleIndex]).format('YYYY-MM-DD')}`, apiFootballRequestHeader)).api.fixtures;

        if (!this.fixtures) return;

        // detail info variable setting
        this.fixtures.forEach((fixture) => {
          this.$set(fixture, 'showFixtureInfo', false);
        });
      } catch (err) {
        console.error(err);
        this.getFixturesFailed = true;
      } finally {
        this.isFixturesLoading = false;
      }
    },

    decreaseFixtureDate() {
      if (this.targetScheduleIndex > 0) {
        this.targetScheduleIndex --;

        if (this.selectedLeague === 'pl') {
          this.getFixturesByLeagueId(apiFootballLeagueId.epl2021);
        } else {
          this.getFixturesByLeagueId(apiFootballLeagueId.faCup2021);
        }
      }
    },

    increaseFixtureDate() {
      if (this.targetScheduleIndex < this.selectedLeagueSchedule.length - 1) {
        this.targetScheduleIndex ++;

        if (this.selectedLeague === 'pl') {
          this.getFixturesByLeagueId(apiFootballLeagueId.epl2021);
        } else {
          this.getFixturesByLeagueId(apiFootballLeagueId.faCup2021);
        }
      }
    },

    async getLeagueTable() {
      this.isTableLoading = true;

      try {
        this.leagueTable = (await this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/leagueTable/${apiFootballLeagueId.epl2021}`, apiFootballRequestHeader)).api.standings[0];
      } catch (err) {
        console.error(err);
      } finally {
        this.isTableLoading = false;
      }
    },

    selectClubInTable(selectedClub) {
      eplClubs.forEach(club => {
        if (club.api_football_team_id === selectedClub.team_id) {
          selectedClub.nos_team_id = club.id;
        }
      });

      this.$router.push(this.localePath({
        name: 'search-searchData',
        params: {
          searchData: `clubId_${selectedClub.nos_team_id}`
        }
      }));
    },

    goToFixturePlayers(fixture) {
      const result = eplClubs
        .filter(club => club.api_football_team_id === fixture.homeTeam.team_id || club.api_football_team_id === fixture.awayTeam.team_id)
        .map(item => item.id)
        .join(',');

      this.$router.push(this.localePath({
        name: 'search-searchData',
        params: {
          searchData: `clubIdList_${result}`
        }
      }));
    }
  }
};
