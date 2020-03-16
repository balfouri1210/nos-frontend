export const state = () => ({
  isLoading: false
});

export const mutations = {
  mutateIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const getters = {
  getIsLoading(state) {
    return state.isLoading;
  }
};

import U from '../lib/util';
import jwtDecode from 'jwt-decode';
export const actions = {
  // nuxtServerInit document
  // https://ko.nuxtjs.org/guide/vuex-store/#nuxtserverinit-%EC%95%A1%EC%85%98
  // params: vuexContext, context
  nuxtServerInit ({ commit }, { req, env, redirect }) {
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

        commit('player/mutatePlayerId', cookie.playerId);
        commit('player/mutatePlayerName', cookie.playerName);
      }
    } catch (err) {
      console.error(err);
    }
  }
};

