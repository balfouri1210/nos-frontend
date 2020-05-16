import U from '../lib/util';
import jwtDecode from 'jwt-decode';

export const state = () => ({
  isLoading: false,
  appStatus: 'season',
  seasonEnd: null,
  seasonStart: null,
  durationToEvent: 0,

  historyYear: null,
  historyMonth: null
});

export const mutations = {
  mutateIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },

  mutateAppStatus(state, status) {
    state.appStatus = status;
  },

  mutateSeasonEnd(state, date) {
    state.seasonEnd = date;
  },

  mutateSeasonStart(state, date) {
    state.seasonStart = date;
  },

  mutateDurationToEvent(state, duration) {
    state.durationToEvent = duration;
  },


  mutateHistoryYear(state, year) {
    state.historyYear = year;
  },

  mutateHistoryMonth(state, month) {
    state.historyMonth = month;
  }
};

export const getters = {
  getIsLoading(state) {
    return state.isLoading;
  },

  getAppStatus(state) {
    return state.appStatus;
  },

  getSeasonEnd(state) {
    return state.seasonEnd;
  },

  getSeasonStart(state) {
    return state.seasonStart;
  },

  getDurationToEvent(state) {
    return state.durationToEvent;
  },

  getIsModalWhiteTone(state, getters) {
    return route => {
      let result;

      if (getters.getAppStatus === 'season') {
        result = route.name.indexOf('histories___') !== -1;
      } else {
        result = route.name.indexOf('index___') !== -1 || route.name.indexOf('histories___') !== -1;
      }

      return result;
    };
  },


  getHistoryYear(state) {
    return state.historyYear;
  },

  getHistoryMonth(state) {
    return state.historyMonth;
  }
};

export const actions = {
  // nuxtServerInit document
  // https://ko.nuxtjs.org/guide/vuex-store/#nuxtserverinit-%EC%95%A1%EC%85%98
  // params: vuexContext, context
  nuxtServerInit ({ commit }, { req }) {
    try {
      if (req.headers.cookie) {
        const cookie = U.cookieParser(req.headers.cookie);
        const jwt = cookie.jwt;
        if (jwt) {
          commit('auth/mutateJwt', jwt);

          const decodedJwt = jwtDecode(jwt);
          commit('auth/mutateId', decodedJwt.id);
          commit('auth/mutateEmail', decodedJwt.email);
          commit('auth/mutateUsername', decodedJwt.username);
        }

        if (cookie.playerId) commit('player/mutatePlayerId', parseInt(cookie.playerId));
        if (cookie.playerName) commit('player/mutatePlayerName', cookie.playerName);
      }
    } catch (err) {
      console.error(err);
    }
  },

  updateAppStatus({ commit }) {
    let durationToEvent;

    // sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6
    if (this.$moment.utc().day() === 5) {
      const now = this.$moment.utc();
      const criterionTime = `${now.format('YYYYMMDD')}1800`;
      
      const seasonEndMoment = this.$moment.utc(criterionTime, 'YYYYMMDDHHmm');
      const seasonStartMoment = this.$moment.utc(criterionTime, 'YYYYMMDDHHmm').add(6, 'hours');

      if (now.isBefore(seasonEndMoment)) {
        durationToEvent = this.$moment.duration(seasonEndMoment.diff(now)).asMilliseconds() - 1000;
  
        if (durationToEvent < 1000 * 60 * 60 * 12) {
          // 시즌종료까지 남은시간이 12시간 이내일 경우
          commit('mutateAppStatus', 'lastStage');
          commit('mutateSeasonEnd', seasonEndMoment);
          commit('mutateSeasonStart', null);
          commit('mutateDurationToEvent', durationToEvent);
        }
      } else if (now.isBefore(seasonStartMoment)) {
        // 프리시즌일 경우
        durationToEvent = this.$moment.duration(seasonStartMoment.diff(now)).asMilliseconds() - 1000;
        commit('mutateAppStatus', 'preseason');
        commit('mutateSeasonEnd', null);
        commit('mutateSeasonStart', seasonStartMoment);
        commit('mutateDurationToEvent', durationToEvent);
      }
    }
  }
};
