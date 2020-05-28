import Cookies from 'js-cookie';

export default ({ store }, inject) => {
  const logout = () => {
    store.commit('auth/clearAuthStore');
    Cookies.remove('nosJwt');
  };

  inject('logout', logout);
};
