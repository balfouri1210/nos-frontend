import U from '../lib/util';
import jwtDecode from 'jwt-decode';

export const state = () => ({
  serviceStatus: 'normal', // normal, maintenance
  comebackTime: '202006280930',

  appStatus: 'season',
  isLoading: false,
  seasonEnd: null,
  seasonStart: null,
  durationToEvent: 0,

  latestHistoryId: null,
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


  mutateLatestHistoryId(state, id) {
    state.latestHistoryId = id;
  },

  mutateHistoryYear(state, year) {
    state.historyYear = year;
  },

  mutateHistoryMonth(state, month) {
    state.historyMonth = month;
  }
};

export const getters = {
  getServiceStatus(state) {
    return state.serviceStatus;
  },

  getComebackTime(state) {
    return state.comebackTime;
  },


  getAppStatus(state) {
    return state.appStatus;
  },

  getIsLoading(state) {
    return state.isLoading;
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


  getLatestHistoryId(state) {
    return state.latestHistoryId;
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
  nuxtServerInit ({ commit }, { req, app, redirect, store }) {
    try {
      if (store.getters.getServiceStatus === 'maintenance') {
        return redirect(app.localePath('maintenance'));
      } else if (req.headers.cookie) {
        const cookie = U.cookieParser(req.headers.cookie);
        const jwt = cookie.nosJwt;

        // 계정 관련 쿠키 기반으로 vuex세팅
        if (jwt) {
          commit('auth/mutateJwt', jwt);

          const decodedJwt = jwtDecode(jwt);
          commit('auth/mutateId', decodedJwt.id);
          commit('auth/mutateEmail', decodedJwt.email);
          commit('auth/mutateUsername', decodedJwt.username);
          commit('auth/mutateAuthorization', decodedJwt.authorization);
        }

        // 히스토리 관련 쿠키 기반으로 vuex세팅
        if (cookie.nosHistoryMonth) commit('mutateHistoryMonth', cookie.nosHistoryMonth);
      }
    } catch (err) {
      console.error(err);
    }
  },

  updateAppStatus({ commit }) {
    let durationToEvent;

    // sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6
    // '돌아오는' 요일의 날짜를 구하고 싶으면, 위 기준에 각각 7을 더하면 된다. 돌아오는 금요일: 5 + 7 = 12

    // if (this.$moment.utc().day() === 5) {
    const now = this.$moment.utc();

    var d = new Date();
    d.setDate(d.getDate() + (5 + 7 - d.getDay()) % 7);
    d = d.toISOString();

    let criterionTime;
    if (this.$moment.utc().day() === 5) {
      criterionTime = `${this.$moment.utc().format('YYYYMMDD')}1800`;
    } else {
      criterionTime = `${this.$moment(d).format('YYYYMMDD')}1800`;
    }

    const seasonEndMoment = this.$moment.utc(criterionTime, 'YYYYMMDDHHmm');
    const seasonStartMoment = this.$moment.utc(criterionTime, 'YYYYMMDDHHmm').add(6, 'hours');

    if (now.isBefore(seasonEndMoment)) {
      durationToEvent = this.$moment.duration(seasonEndMoment.diff(now)).asMilliseconds() - 1000;
      commit('mutateSeasonEnd', seasonEndMoment);
      commit('mutateSeasonStart', null);
      commit('mutateDurationToEvent', durationToEvent);

      if (durationToEvent < 1000 * 60 * 60 * 24) {
        // 시즌종료까지 남은시간이 24시간 이내일 경우
        commit('mutateAppStatus', 'lastStage');
      }
    } else if (now.isBefore(seasonStartMoment)) {
      // 프리시즌일 경우
      durationToEvent = this.$moment.duration(seasonStartMoment.diff(now)).asMilliseconds() - 1000;
      commit('mutateAppStatus', 'preseason');
      commit('mutateSeasonEnd', null);
      commit('mutateSeasonStart', seasonStartMoment);
      commit('mutateDurationToEvent', durationToEvent);
    }
    // }
  }
};
