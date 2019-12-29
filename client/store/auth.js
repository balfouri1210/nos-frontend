export const state = () => ({
  jwt: null,
  email: null,
  username: null
});

export const mutations = {
  mutateJwt(state, jwt) {
    state.jwt = jwt;
  },

  mutateEmail(state, email) {
    state.email = email;
  },

  mutateUsername(state, username) {
    state.username = username;
  },

  clearAuthStore(state) {
    state.jwt = null;
    state.email = null;
    state.username = null;
  }
};

export const getters = {
  getJwt(state) {
    return state.jwt;
  },

  getEmail(state) {
    return state.email;
  },

  getUsername(state) {
    return state.username;
  }
};

