export default ({ store, app }, inject) => {
  const logout = () => {
    store.commit('auth/clearAuthStore');
    app.$cookies.remove('nos-jwt', {
      domain: process.env.STAGE === 'local' ? 'localhost' : '.907degrees.com'
    });
  };

  inject('logout', logout);
};
