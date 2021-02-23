import jwtDecode from 'jwt-decode';

export const state = () => ({
  serviceStatus: 'normal', // normal, maintenance
  comebackTime: '202012260930',

  appStatus: 'season', // season, lastStage, preseason
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
        const jwt = app.$cookies.get('nos_jwt');
        const nos_history_month = app.$cookies.get('nos_history_month');

        // 계정 관련 쿠키 기반으로 vuex세팅
        // !! NOTICE !! 새로운 쿠키 추가할 때 serverless.yml에 whitelist 추가해주는거 잊으면 안된다.
        if (jwt) {
          commit('auth/mutateJwt', jwt);

          const decodedJwt = jwtDecode(jwt);
          commit('auth/mutateId', decodedJwt.id);
          commit('auth/mutateEmail', decodedJwt.email);
          commit('auth/mutateUsername', decodedJwt.username);
          commit('auth/mutateAuthorization', decodedJwt.authorization);
        }

        // 히스토리 관련 쿠키 기반으로 vuex세팅
        if (nos_history_month) commit('mutateHistoryMonth', nos_history_month);
      }
    } catch (err) {
      console.error(err);
    }
  },

  updateAppStatus({ commit }) {
    const NOW = this.$moment.utc();
    const YYYYMMDDHHmm = 'YYYYMMDDHHmm';
    const YYYYMMDD = 'YYYYMMDD';

    const seasonEndMoment = this.$moment.utc(getCriterionTime(this.$moment), YYYYMMDDHHmm).subtract(2, 'minutes');
    const seasonStartMoment = this.$moment.utc(getCriterionTime(this.$moment), YYYYMMDDHHmm).add(3, 'minutes');

    if (NOW.isBefore(seasonEndMoment)) {
      const durationToEvent = this.$moment.duration(seasonEndMoment.diff(NOW)).asMilliseconds() - 1000;
      commit('mutateSeasonEnd', seasonEndMoment);
      commit('mutateSeasonStart', null);
      commit('mutateDurationToEvent', durationToEvent);
  
      if (durationToEvent < 1000 * 60 * 60 * 24) {
        // 시즌종료까지 남은시간이 24시간 이내일 경우
        commit('mutateAppStatus', 'lastStage');
      }
    } else {
      // 프리시즌일 경우 (광고보고 들어오는 사람들이 preseason UI를 보지않도록 유저가 모일 때 까지는 preseason 해제한다. 20210221)
      const durationToEvent = this.$moment.duration(seasonStartMoment.diff(NOW)).asMilliseconds() - 1000;
      commit('mutateAppStatus', 'preseason');
      commit('mutateSeasonEnd', null);
      commit('mutateSeasonStart', seasonStartMoment);
      commit('mutateDurationToEvent', durationToEvent);
    }


    function getCriterionTime(moment) {
      // 기준시 설정 문제는 여기에서 도움을 받았다.
      // https://stackoverflow.com/questions/34979051/find-next-instance-of-a-given-weekday-ie-monday-with-moment-js

      // sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6
      const dayINeed = 5;
      const criterionHourMin = 1800;
      const today = moment().utc().isoWeekday();

      // if we haven't yet passed the day of the week that I need:
      if (today < dayINeed) { 
        // 오늘이 월화수목에 속할 경우, '이번주' 금요일 18시로 기준시 설정
        return `${moment().utc().isoWeekday(dayINeed).format(YYYYMMDD)}${criterionHourMin}`;
      } else {
        if (today === dayINeed && moment.utc().format('HHmm') < criterionHourMin) {
          // 금요일 18시 이전에는 오늘 18시로 기준시 설정
          return `${moment.utc().format(YYYYMMDD)}${criterionHourMin}`;
        } else {
          // 금요일 18시 이후에는 '다음주' 금요일 18시로 기준시 설정.
          return `${moment().utc().add(1, 'weeks').isoWeekday(dayINeed).format(YYYYMMDD)}${criterionHourMin}`;
        }
      }
    }

  }
};
