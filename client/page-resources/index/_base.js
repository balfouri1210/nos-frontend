import nosTopPlayer from '@/components/nos-top-player/nos-top-player.vue';
import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';
import nosCountdown from '@/components/nos-countdown/nos-countdown';
import nosPreseasonUi from '@/components/nos-preseason-ui/nos-preseason-ui.vue';
import nosOnboardingUi from '@/components/nos-onboarding-ui/nos-onboarding-ui.vue';
import nosMainEvent from '@/components/nos-main-event/nos-main-event.vue';
import { apiFootballRequestHeader, apiFootballLeagueId } from '@/lib/constants';
import { premierLeagueSchedule, faCupSchedule } from '@/lib/schedules';
import nosLandingCommentArea from '@/components/nos-landing-comment-area/nos-landing-comment-area.vue';

export default {
  layout: 'wide',

  components: {
    nosTopPlayer,
    nosPlayerList,
    nosCountdown,
    nosPreseasonUi,
    nosOnboardingUi,
    nosMainEvent,
    nosLandingCommentArea
  },

  fetch({ store }) {
    store.dispatch('updateAppStatus');
  },

  async asyncData({ $axios, error, store, $ua, redirect, app }) {
    const browser = $ua.browser().toLowerCase();
    if (browser === 'internet explorer')
      return redirect(app.localePath('unsupported-browser'));


    if (store.getters.getAppStatus === 'preseason') {
      return;
    } else {
      try {
        const wholePlayerList = await $axios.$get('/api/players');
        const topPlayer = wholePlayerList[0];

        const high12Players = wholePlayerList.slice(1, 13);
        const restOfPlayers = wholePlayerList.slice(13, wholePlayerList.length);
        return { topPlayer, high12Players, restOfPlayers };
      } catch (err) {
        console.error(err);
        return error({ statusCode: 500 });
      }
    }
  },

  data() {
    return {
      playerCommentsPreview: [],
      isBottomOfWindow: false,

      isFixtures: false,
      isTable: false,

      selectedLeagueSchedule: [],
      targetScheduleIndex: null,
      isFixturesLoading: false,
      isTableLoading: false,
      selectedLeague: 'pl',
      fixtures: [],

      leagueTable: []
    };
  },

  computed: {
    previousPlayerIdList() {
      const result = this.high12Players.map(player => player.id);
      result.unshift(this.topPlayer.id);
      return result;
    }
  },

  mounted() {
    window.addEventListener('scroll', this.detectScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.detectScroll);
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
        this.getFixturesByLeagueId(apiFootballLeagueId.epl1920);
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
        this.getFixturesByLeagueId(apiFootballLeagueId.epl1920);
      } else {
        this.selectedLeagueSchedule = faCupSchedule;
        this.initiateTargetScheduleIndex();
        this.getFixturesByLeagueId(apiFootballLeagueId.faCup1920);
      }
    },

    initiateTargetScheduleIndex() {
      for (const [index, el] of this.selectedLeagueSchedule.entries()) {
        if (this.$moment(el).format('YYYYMMDD') >= this.$moment.utc().format('YYYYMMDD')) {
          this.targetScheduleIndex = index;
          break;
        }
      }

      if (!this.targetScheduleIndex)
        this.targetScheduleIndex = this.selectedLeagueSchedule.length - 1;
    },

    async getFixturesByLeagueId(leagueId) {
      this.isFixturesLoading = true;

      try {
        this.fixtures =
          (await this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/fixtures/league/${leagueId}/${this.$moment(this.selectedLeagueSchedule[this.targetScheduleIndex]).format('YYYY-MM-DD')}`, apiFootballRequestHeader)).api.fixtures;
      } catch (err) {
        console.error(err);
      } finally {
        this.isFixturesLoading = false;
      }
    },

    decreaseFixtureDate() {
      if (this.targetScheduleIndex > 0) {
        this.targetScheduleIndex --;

        if (this.selectedLeague === 'pl') {
          this.getFixturesByLeagueId(apiFootballLeagueId.epl1920);
        } else {
          this.getFixturesByLeagueId(apiFootballLeagueId.faCup1920);
        }
      }
    },

    increaseFixtureDate() {
      if (this.targetScheduleIndex < this.selectedLeagueSchedule.length - 1) {
        this.targetScheduleIndex ++;

        if (this.selectedLeague === 'pl') {
          this.getFixturesByLeagueId(apiFootballLeagueId.epl1920);
        } else {
          this.getFixturesByLeagueId(apiFootballLeagueId.faCup1920);
        }
      }
    },

    async getLeagueTable() {
      this.isTableLoading = true;

      try {
        this.leagueTable = (await this.$axios.$get(`${process.env.API_FOOTBALL_API_URL}/leagueTable/${apiFootballLeagueId.epl1920}`, apiFootballRequestHeader)).api.standings[0];
      } catch (err) {
        console.error(err);
      } finally {
        this.isTableLoading = false;
      }
    },

    detectScroll() {
      let bottomOfWindow =
          // 스크롤 위치 중 최대값
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
          // 화면 높이
          window.innerHeight >=
          // player-list-wrapper 높이
          document.getElementById('home-body').offsetHeight;

      if (bottomOfWindow)
        this.isBottomOfWindow = true;
    }
  }
};
