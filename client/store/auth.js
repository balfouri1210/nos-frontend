export const state = () => ({
  jwt: null,
  id: null,
  email: null,
  username: null
});

export const mutations = {
  mutateJwt(state, jwt) {
    state.jwt = jwt;
  },

  mutateId(state, id) {
    state.id = id;
  },

  mutateEmail(state, email) {
    state.email = email;
  },

  mutateUsername(state, username) {
    state.username = username;
  },

  clearAuthStore(state) {
    state.jwt = null;
    state.id = null;
    state.email = null;
    state.username = null;
  }
};

export const getters = {
  getJwt(state) {
    return state.jwt;
  },

  getId(state) {
    return state.id;
  },

  getEmail(state) {
    return state.email;
  },

  getUsername(state) {
    return state.username;
  }
};

