export const state = () => ({
});

export const mutations = {
};

export const getters = {
};

import U from '../lib/util';
import jwtDecode from 'jwt-decode';
export const actions = {
  // nuxtServerInit document
  // https://ko.nuxtjs.org/guide/vuex-store/#nuxtserverinit-%EC%95%A1%EC%85%98
  nuxtServerInit ({ commit }, { req, env, redirect }) {
    const jwt = U.cookieParser(req.headers.cookie).jwt;
    if (jwt) {
      commit('auth/mutateJwt', jwt);
      
      const decodedJwt = jwtDecode(jwt);
      commit('auth/mutateId', decodedJwt.id);
      commit('auth/mutateEmail', decodedJwt.email);
      commit('auth/mutateUsername', decodedJwt.username);
    }
  }
};

