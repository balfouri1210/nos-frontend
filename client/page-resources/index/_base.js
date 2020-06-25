import nosTopPlayer from '@/components/nos-top-player/nos-top-player.vue';
import nosPlayerList from '@/components/nos-player-list/nos-player-list.vue';
import nosCountdown from '@/components/nos-countdown/nos-countdown';
import nosPreseasonUi from '@/components/nos-preseason-ui/nos-preseason-ui.vue';
import nosOnboardingUi from '@/components/nos-onboarding-ui/nos-onboarding-ui.vue';

export default {
  layout: 'wide',

  components: {
    nosTopPlayer,
    nosPlayerList,
    nosCountdown,
    nosPreseasonUi,
    nosOnboardingUi
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

        wholePlayerList.shift();
        const restOfPlayers = wholePlayerList;
        return { topPlayer, restOfPlayers };
      } catch (err) {
        console.error(err);
        return error({ statusCode: 500 });
      }
    }
  },

  methods: {
    seasonEndHandler() {
      window.location.reload();
    }
  }
};
