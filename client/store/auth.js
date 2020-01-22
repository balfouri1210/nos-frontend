export const state = () => ({
  jwt: null,
  id: null,
  email: null,
  username: null,
  unreadNotificationCount: null
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

  mutateUnreadNotificationCount(state, unreadNotificationCount) {
    state.unreadNotificationCount = unreadNotificationCount;
  },

  clearAuthStore(state) {
    state.jwt = null;
    state.id = null;
    state.email = null;
    state.username = null;
    state.unreadNotificationCount = null;
  }
};

export const actions = {
  async mutateUnreadNotificationCountAction({ commit, getters }) {
    const result = await this.$axios.$get(`/api/notifications/unread/${getters.getId}`);

    commit(
      'mutateUnreadNotificationCount',
      result.unreadNotificationCount
    );
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
  },

  getUnreadNotificationCount(state) {
    return state.unreadNotificationCount;
  }
};

